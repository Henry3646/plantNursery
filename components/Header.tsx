import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Coins, ChevronLeft } from 'lucide-react-native'
import { router } from 'expo-router'

const Header = ({ title, gold, chevron }: { title: string, gold: number, chevron: boolean }) => {
  return (
    <View className='w-full h-20 bg-c justify-between items-center flex-row mt-12'>
      <View className='flex-row items-center'>
        {chevron ? 
          <TouchableOpacity onPress={() => router.back()} className='flex-row items-center'>
            <ChevronLeft size={30} strokeWidth={2} color='black'/>
            <Text className='text-4xl'>{title}</Text>
          </TouchableOpacity> 
        : 
          <Text className='text-4xl ml-6'>{title}</Text>
        }
      </View>
      {gold >= 0 ?
        <View className='flex-row mr-6'>
            <Coins size={30} strokeWidth={2} color='gold'/>
            <Text className='text-[1.7rem] ml-2'>{gold}</Text>
        </View>
      : null}
    </View>
  )
}

export default Header