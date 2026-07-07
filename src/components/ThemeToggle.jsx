import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from './ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      <div className="w-[39px] h-[39px] hover:bg-secondary/5 flex items-center justify-center rounded-md dark:hover:bg-light-mode-hover">
        {theme === "light" ? (
          <MoonIcon className="h-4 w-4 text-secondary" />
        ) : (
          <SunIcon className="w-4 h-4 text-white" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
