import React from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from './ThemeContext'

const Footer = () => {
  const { theme } = useTheme() // ✅ ប្រើ context ដើម្បីទទួល theme

  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-footer-light py-8 px-4 dark:bg-accent transition-all duration-300'>
      <div className='container mx-auto text-center'>
        <div className="flex flex-col items-center gap-4">
          <div className='flex items-center gap-2'>
            <span className='dark:text-white'>Theme:</span>
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
          <p className='text-muted-foreground'>&copy; {currentYear} Hou Menghor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
