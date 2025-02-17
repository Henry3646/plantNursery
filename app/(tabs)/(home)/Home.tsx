import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import getCurrentUserId from '../../../util/getCurrentUserId';
import { supabase } from '../../../lib/supabase';
import { Sprout } from 'lucide-react-native'
import { router } from 'expo-router';

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<any>(null);

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

    const getPlants = async (id: any) => {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', id)
      if (error) {
        console.log(error)
      }
      if (data) {
        setPlants(data)
      }
    }

  useEffect(() => {
    getCurrentUserId().then((id) => {
      getUser(id)
      getPlants(id)
    })
  }, []);
  return (
    <View className='w-full h-full bg-c'>
      <Header title='Home' gold={user?.gold} chevron={false} />
      <TouchableOpacity className='w-[65px] h-[65px] bg-dgr rounded-full absolute bottom-[90px] left-[8px] justify-center items-center' onPress={() => router.push('/Seeds')}>
        <Sprout size={40} strokeWidth={2} color='#FEFEE3'/>
      </TouchableOpacity>
      
    </View>
  );
}


