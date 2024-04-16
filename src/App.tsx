import React from 'react'
import { Toaster } from "@/components/ui/toaster";
import Path from './route/Path'
import { ThemeProvider } from './app/features/theme/theme-provider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Path />
    </ThemeProvider>
  )
}

export default App