import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

const Timer = ({ timeRemaining, setTimeRemaining, setStarted, isRunning, setIsRunning, handleCancel, setTime }) => {


  const startTimer = () => {
    setIsRunning(true)
    setStarted(true)
  }

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString()
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')

    let time = ''
    if (hrs !== '0') time += `${hrs}:`
    if (mins !== '00' || hrs !== '00') time += `${mins}:`

    time += `${secs}`
    return time
  }

  // Timer logic
  useEffect(() => {
    let timer
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1)
    } else if (timeRemaining <= 0) {
      setIsRunning(false)
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeRemaining])

  return (
    <View className=" items-center">
      <Text className="text-7xl font-bold text-gray-800 mb-8">
        {formatTime(timeRemaining)}
      </Text>
      <View className="flex-row space-x-4">
        {!isRunning ? 
        
        <TouchableOpacity
          className="bg-bgr px-6 py-3 rounded-full"
          onPress={startTimer}
        >
          <Text className="text-white text-lg font-medium">
            Start
          </Text>
        </TouchableOpacity>
        :
        
        null  
      }
      </View>
    </View>
  )
}

export default Timer
