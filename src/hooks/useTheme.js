import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function useTheme() {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        new Error('Theme context should be used in ThemeContextProvider')
    }
  return context;
}
