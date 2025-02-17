import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserRound, Lock } from 'lucide-react-native'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        router.push('/(auth)/signup')
    }

    const handleSignIn = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) {
            console.log(error)
        } else {
            router.replace('/(tabs)/(home)/Home')
        }
    }

  return (
    <View className='w-full h-full bg-c justify-center items-center'>
        <Text className='text-center text-6xl text-dgr' >Plant Nursery</Text>
        <View className='w-3/4 border-2 border-dgr h-12 rounded-lg mt-5 items-center flex-row justify-between'>
            <View className='h-full items-center justify-center' >
                <UserRound size={30} strokeWidth={1} color='#2C6E49' />
            </View>
            <TextInput className='w-5/6 h-3/4 ml-2 placeholder:text-lgr text-sm' placeholder='Email' value={email} onChangeText={setEmail} />
        </View>
        <View className='w-3/4 border-2 border-dgr h-12 rounded-lg mt-5 items-center flex-row justify-between'>
            <View className='h-full items-center justify-center' >
                <Lock size={30} strokeWidth={1} color='#2C6E49' />
            </View>
            <TextInput className='w-5/6 h-3/4 ml-2 placeholder:text-lgr text-sm' placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} />
        </View>
        <TouchableOpacity className='w-3/4 h-12 mt-5 items-center justify-center rounded-lg bg-lgr' onPress={handleSignIn}>
            <Text className='text-c text-xl'>Sign In</Text>
        </TouchableOpacity>
        <View>
            <Text className='text-dg mt-5'>Don't have an account? <Text className='text-lgr' onPress={handleSignUp}>Sign Up</Text></Text>
        </View>
    </View>
  )
}

export default Auth