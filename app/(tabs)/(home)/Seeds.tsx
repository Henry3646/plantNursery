import { View, Text, ScrollView, Image, RefreshControl, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState, useCallback,  } from 'react'
import Header from '../../../components/Header'
import getCurrentUserId from '@/util/getCurrentUserId'
import { supabase } from '../../../lib/supabase'
import { SvgXml } from 'react-native-svg'
import { useFocusEffect } from '@react-navigation/native'


const Seeds = () => {
    const [seeds, setSeeds] = useState<any>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [ modalVisible, setModalVisible ] = useState<boolean>(false)
    const [ seed, setSeed ] = useState<any>(null)

    const getSeeds = async () => {
        const { data, error } = await supabase
            .from('seeds')
            .select('*')
            .eq('user_id', userId)
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            setSeeds(data)
        }
    }

    const handleShowSeed = (seed: any) => {
        setSeed(seed)
        setModalVisible(true)
    }

    useEffect(() => {
        getCurrentUserId().then((id) => {
            setUserId(id)
        })
    }, [])

    useEffect(() => {
        if (userId) {
            getSeeds()
        }
    }, [userId])

    const onRefresh = () => {
        setRefreshing(true)
        getSeeds()
        setRefreshing(false)
      }
    
      useFocusEffect(
        useCallback(() => {
          // Trigger a refresh when the screen gains focus
          onRefresh();
        }, [])
      );

  return (
    <View className='w-full h-full bg-c'>
        <Modal 
            visible={modalVisible}
            animationType='slide'
            transparent={true}>
            <View className='w-full h-full bg-opacity-50 items-center justify-center'>
                
            </View>
        </Modal>
        <Header title='Seeds' gold={-1} chevron={true} />
        <View>

        </View>
        <ScrollView
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#2C6E49" // iOS: Customize spinner color
                  colors={['#2C6E49']} // Android: Customize spinner colors
                />
              }
        >
            <View className='flex-wrap flex-row'>
                {seeds?.map((seed: any, index: number) => {
                    return (
                        <View key={index} className='w-1/3 h-40  rounded-lg items-center justify-center'>
                            <TouchableOpacity onPress={() => handleShowSeed(seed)}>
                                <View className='bg-dgr items-center justify-center p-6 rounded-2xl'>
                                <SeedIcon rarity={seed.rarity}/>
                                <Text>{seed.rarity}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <View className='h-28'/>
        </ScrollView>
    </View>
  )
}

const SeedIcon = ({ rarity }: {rarity: string}) => {
    const [color, setColor] = useState<string>('#000')

    useEffect(() => {
        switch (rarity) {
            case 'Common':
                setColor('#A9A9A9')
                break
            case 'Uncommon':
                setColor('#51CB20')
                break
            case 'Rare':
                setColor('#2708A0')
                break
            case 'Epic':
                setColor('#FF47DA')
                break
            case 'Legendary':
                setColor('#FF5C0A')
                break
            default:
                setColor('#000')
        }
    })

    const xml = `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-seed" viewBox="0 0 24 24"><path d="M20.7,3.3C20.7,3.3 19.3,3 17.2,3C11.7,3 1.6,5.1 3.2,20.8C4.3,20.9 5.4,21 6.4,21C24.3,21 20.7,3.3 20.7,3.3M7,17C7,17 7,7 17,7C17,7 11,9 7,17Z" fill="${color}" /></svg>`
    return (
        <SvgXml xml={xml} width={70} height={70} stroke={'#000'} strokeWidth={0.5}/>
    )
}

export default Seeds