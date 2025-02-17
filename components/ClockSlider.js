import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CircleSlider from 'react-native-circle-slider';

const TimerCircleSlider = ({ setTimeRemaining}) => {
  const [sliderValue, setSliderValue] = useState(65);

  // Map the slider value (0-360) to the timer range (15 to 180 minutes)
  const calculateMinutes = (value)=> {
    const min = 5;
    const max = 180;
    const calculatedValue = Math.round((value / 360) * (max - min) + min)
    return Math.round(calculatedValue / 5) * 5
  }
  
  const handleSliderChange = (value) => {
    setSliderValue(value);
    setTimeRemaining(calculateMinutes(value) * 60);
  }

  return (
    <View className="flex-1 justify-center items-center bg-c">
      <View className="relative justify-center items-center">
        <CircleSlider
          value={sliderValue}
          onValueChange={(value) => handleSliderChange(value)}
          strokeWidth={10}
          size={250}
          dialWidth={10}
          dialColor="#4caf50"
          meterColor="#4caf50"
          textColor="transparent"
          strokeColor='#2C6E49'
          yCenter={280}
        />
      </View>
    </View>
  );
};

export default TimerCircleSlider;
