import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='lg:hidden bg-footer-light py-4 px-4 dark:bg-accent transition-all duration-300'>
      <div className='container mx-auto text-center'>
        <div className="flex flex-col items-center">
          <p className='text-xs text-muted-foreground'>&copy; {currentYear} Hou Menghor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
