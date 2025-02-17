import { View, Text, AppState, AppStateStatus, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import Clock from '../../components/Clock'
import Header from '../../components/Header'
import { supabase } from '../../lib/supabase'
import getCurrentUserId from '@/util/getCurrentUserId'
import ClockSlider from '@/components/ClockSlider'
import { lootbox } from '@/util/lootbox'


const Timer = () => {
  const [ user, setUser ] = useState<any>(null)
  const [ userId, setUserId ] = useState<string | null>(null)
  const [ timeRemaining, setTimeRemaining ] = useState<number>(98)
  const [ started, setStarted ] = useState<boolean>(false)
  const [ isRunning, setIsRunning ] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState);
  const [ leftTime, setLeftTime ] = useState<number>(0)
  const [ time, setTime ] = useState<number>(0)
  const [ modalVisible, setModalVisible ] = useState<boolean>(false)
  const [ loot, setLoot ] = useState<string | undefined>('')
  const [ goldWon, setGoldWon ] = useState<number>(0)
  const [ userLost, setUserLost ] = useState<boolean>(false)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (appState === 'inactive' && nextAppState === 'background') {
        console.log('User has left the app.');
        setLeftTime(timeRemaining)
      } else if (nextAppState === 'active') {
        console.log('User has returned to the app.');
        setLeftTime(-1)
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);


  const getUser = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
    if (error) {
      console.log(error)
    }
    if (data) {
      setUser(data[0])
    }
  }

  const handleCancelTimer = () => {
    setTimeRemaining(60)
    setStarted(false)
    setIsRunning(false)
  }

  const handleWin = async () => {
    let gold = Math.floor(Math.random() * 10) + 1;
    setGoldWon(gold)
    gold += user.gold
    await supabase
      .from('profiles')
      .update({ gold })
      .eq('user_id', userId)
      .then(() => {
        getUser()
      })

    if (loot !== 'No Loot') {
      const {data, error} = await supabase
      .from('seeds')
      .insert([{ user_id: userId, rarity: loot }])
      .select()

      if (error) {
        console.log(error)
      }
      if (data) {
        console.log(data)
      }
    }
    handleCancelTimer()
  }

  const handleLose = () => {
    setUserLost(true)
    handleCancelTimer()
  }

  useEffect(() => {
    getCurrentUserId().then((id) => {
      setUserId(id)
    })
  }, [])

  useEffect(() => {
    if (leftTime > 0){
      if (leftTime - timeRemaining > 5) {
        console.log('you lose!')
        handleLose()
      }
    }

    if (timeRemaining === 0) {
      const lootString = lootbox(time)
      setLoot(lootString)
    }
  }, [timeRemaining])

  useEffect(() => {
    if (loot !== '') {
      console.log(loot)
      handleWin().then(() => {
        setModalVisible(true)
      }
      )
    }
  }, [loot])
  
  useEffect(() => {
    if (userId) {
      getUser()
    }
  }, [userId])

  return (
    <View className='w-full h-full bg-c '>
      <Modal 
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        >
        <View className='bg-black w-full h-full absolute opacity-20 ' />
        <View className='w-full h-full items-center justify-center'>
          <View className='w-3/4 h-[150px] bg-c items-center justify-around rounded-3xl'>
            <Text className='text-black text-3xl '>You earned {goldWon} gold!</Text>
            {loot !== 'No Loot' && <Text className='text-black text-2xl '>You found a {loot} seed!</Text>}
            <TouchableOpacity onPress={() => setModalVisible(false)} className='bg-bgr px-4 py-2 rounded-xl'>
              <Text className='text-black '>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={userLost}
        transparent={true}
        onRequestClose={() => setUserLost(false)}
      >
        <View className='bg-black w-full h-full absolute opacity-20 ' />
        <View className='w-full h-full items-center justify-center'>
          <View className='w-3/4 h-[150px] bg-c items-center justify-around rounded-3xl'>
            <Text className='text-black text-3xl '>You lost!</Text>
            <Text className='text-black text-2xl '>Next time, don't leave the app!</Text>
            <TouchableOpacity onPress={() => setUserLost(false)} className='bg-bgr px-4 py-2 rounded-xl'>
              <Text className='text-black '>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Header title='Timer' gold={user?.gold} chevron={false} />
      <View className='absolute items-center justify-center w-full mt-40'>
        {!started && <ClockSlider setTimeRemaining={setTimeRemaining} /> }
        {started && 
          <View className='items-center justify-center border-[10px] w-[270] h-[270] rounded-full border-bgr mt-[10px] '>
            <Text className="absolute font-bold text-gray-900">
              plant
            </Text>
          </View>
        }
      </View>
      <View className='absolute bottom-32 w-full'>
        <Clock timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} setStarted={setStarted} isRunning={isRunning} setIsRunning={setIsRunning} handleCancel={handleCancelTimer} setTime={setTime} />
      </View>
    </View>
  )
}

export default Timer