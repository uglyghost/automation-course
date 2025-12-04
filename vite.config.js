import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/automation-course/', // ⚠️ 务必与 GitHub 仓库名一致，前后都要有斜杠
})
