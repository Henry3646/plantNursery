import { View, Text, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
import Auth from '../../components/Auth'


const index = () => {

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    return (
      <View>
        <Auth />
        {session && session.user && <Text>{session.user.id}</Text>}
      </View>
    )
}

export default index