import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Coins } from 'lucide-react-native'

const ShopPlantRow = ({ plants, rarity, handlePurchase }: { plants: any[], rarity: any, handlePurchase: any }) => {
    const colors: { [key: string]: string } = {
        common: '#A9A9A9',
        uncommon: '#51CB20',
        rare: '#2708A0',
        epic: '#FF47DA',
        legendary: '#FFD700'
    }
    const capitalize = (s: string) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    
  return (
    <View className='w-full h-36'>
        <Text className='mb-1 ml-6 font-bold '>{capitalize(rarity)}</Text>
        <View className='flex-row justify-around'>
        {plants && plants.map((plant: any) => {
            return (
                <TouchableOpacity className='w-[120px]' key={plant.id} onPress={() => handlePurchase(plant)}>
                <View className={`w-full h-[100px] border-[2px] items-center justify-around rounded-2xl`} style={{borderColor: colors[plant.rarity]}}>
                    <Text className='w-full text-center font-semibold'>{plant.name}</Text>
                    <Text style={{ color: colors[plant.rarity]}} className='font-semibold'>{capitalize(rarity)}</Text>
                    <View className='flex-row'>
                        <Coins size={15} strokeWidth={2} color='#FFD700' />
                        <Text>{plant.cost}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            )})}
        </View>
    </View>
  )
}

export default ShopPlantRow