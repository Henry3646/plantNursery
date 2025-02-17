import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import getCurrentUserId from '../../../util/getCurrentUserId'
import { supabase } from '../../../lib/supabase'
import ShopPlantRow from '@/components/ShopPlantRow'
import { Coins } from 'lucide-react-native'

const Store = () => {
  const [user, setUser] = useState<any>(null)
  const [plants, setPlants] = useState<any>({})

  const updateGold = async (newGold: number) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ gold: newGold })
      .eq('user_id', user.user_id)
      .select()
    if (error) {
      console.log(error)
    }
    if (data) {
      setUser(data[0])
    }
  }

  const addPlant = async (plant: any) => {
    const { data, error } = await supabase
      .from('plants')
      .insert([
        { 
          user_id: user.user_id,
          level: 0,
          xp: 0,
          rarity: plant.rarity,
          name: plant.name,
        }])
        
    }

  const purchasePlant = async (plant: any) => {

    if (user.gold < plant.cost) {
        Alert.alert('Not enough gold!', 'Try studying more :)');
        return
    }
    const newGold = user.gold - plant.cost
    updateGold(newGold)
    await addPlant(plant).then(() => {
      Alert.alert('Success!', `You have purchased a ${plant.name}!`)
    })
  }

  const getUser = async (id: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)
    if (error) {
      console.log(error)
    }
    if (data) {
      setUser(data[0])
    }
  }

  const getPlants = async () => {
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']
    const plantsByRarity: { [key: string]: any[] } = {
      common: [],
      uncommon: [],
      rare: [],
      epic: [],
      legendary: []
    }

    for (const rarity of rarities) {
      const { data, error } = await supabase
        .from('plantTypes')
        .select('*')
        .eq('rarity', rarity)
        .limit(3)
      if (error) {
        console.log(error)
      }
      if (data) {
        plantsByRarity[rarity] = data
      }
    }
    setPlants(plantsByRarity)
  }

  useEffect(() => {
    getCurrentUserId().then((id) => {
      getUser(id)
    })
    getPlants()
  }, [])
  return (
    <View className='w-full h-full bg-c'>
      <Header title='Store' gold={user?.gold} chevron={false} />
      <ScrollView>
      <Text className='ml-6 text-3xl font-semibold' >Plants</Text>
      <View>
        {Object.keys(plants).map((rarity) => {
          return (
            <View key={rarity}>
              <ShopPlantRow plants={plants[rarity]} rarity={rarity} handlePurchase={purchasePlant} />
            </View>
          )
        })}
        <View>
          <Text className='text-3xl ml-6 font-semibold'>Plots</Text>
          <TouchableOpacity className='flex-row items-center'>
          <View className='w-full items-center'>
            <View className='w-[100px] h-[80px] border-2 rounded-2xl'>
              <View className='flex-col items-center'>
                <Text>+1 Plot</Text>
                <View className='flex-row'>
                  <Coins size={15} strokeWidth={2} color='#FFD700' />
                  <Text className='text-lg'>100</Text>
                </View>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className='h-[100px]'/>
      </ScrollView>
    </View>
  )
}

export default Store