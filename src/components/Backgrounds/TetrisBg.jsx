import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

// Tetris background with actual stacking and line clears
export default function TetrisBg() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const strokeColor = theme === 'dark' ? 'rgba(253,251,212,0.35)' : 'rgba(0,0,0,0.8)'
    const BLOCK = 44
    const SPEED = 0.03 // Blocks per frame (slower default)

    let raf
    let cols = 0
    let rows = 0
    let grid = []
    let activePieces = []
    let isSpeeding = false

    const handleDown = () => { isSpeeding = true }
    const handleUp = () => { isSpeeding = false }
    
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchstart', handleDown)
    window.addEventListener('touchend', handleUp)

    const SHAPES = [
      [[0,0],[1,0],[2,0],[3,0]], // I
      [[0,0],[0,1],[1,0],[1,1]], // O
      [[0,1],[1,0],[1,1],[1,2]], // T
      [[0,0],[1,0],[1,1],[2,1]], // S
      [[0,1],[1,0],[1,1],[2,0]], // Z
      [[0,0],[1,0],[2,0],[2,1]], // L
      [[0,1],[1,1],[2,1],[2,0]], // J
    ]

    function resize() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      const newCols = Math.ceil(w / BLOCK)
      const newRows = Math.ceil(h / BLOCK)

      // Initialize or expand grid if dimensions changed
      if (newCols !== cols || newRows !== rows) {
        const newGrid = Array.from({ length: newRows }, () => Array(newCols).fill(0))
        // Copy old grid if resizing
        for (let r = 0; r < Math.min(rows, newRows); r++) {
          for (let c = 0; c < Math.min(cols, newCols); c++) {
            newGrid[newRows - rows + r][c] = grid[r][c]
          }
        }
        grid = newGrid
        cols = newCols
        rows = newRows
      }
    }

    function spawn() {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const minCol = Math.floor(cols * 0.6) // Right 40%
      const col = minCol + Math.floor(Math.random() * (cols - minCol - 3))
      return {
        shape,
        col,
        row: -4, // Start above screen
        speed: SPEED * (0.8 + Math.random() * 0.4),
      }
    }

    function isValid(shape, rOffset, cOffset) {
      for (const [dr, dc] of shape) {
        const r = Math.floor(rOffset + dr)
        const c = Math.floor(cOffset + dc)
        if (c < 0 || c >= cols) return false
        if (r >= rows) return false
        if (r >= 0 && grid[r][c] === 1) return false
      }
      return true
    }

    function lockPiece(p) {
      for (const [dr, dc] of p.shape) {
        const r = Math.floor(p.row + dr)
        const c = p.col + dc
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          grid[r][c] = 1
        }
      }
    }

    function clearLines() {
      let linesCleared = 0
      for (let r = rows - 1; r >= 0; r--) {
        // Only check lines on the right 40% where pieces spawn
        const minCol = Math.floor(cols * 0.6)
        let full = true
        for (let c = minCol; c < cols; c++) {
          if (grid[r][c] === 0) {
            full = false
            break
          }
        }
        if (full) {
          grid.splice(r, 1)
          grid.unshift(Array(cols).fill(0))
          linesCleared++
          r++ // Recheck same row index after shift
        }
      }
      return linesCleared
    }

    function drawBlock(r, c) {
      const x = c * BLOCK
      const y = r * BLOCK
      ctx.strokeRect(x + 1, y + 1, BLOCK - 2, BLOCK - 2)
    }

    function tick() {
      // Lazy resize check
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        resize()
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2.5

      // Draw settled grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 1) drawBlock(r, c)
        }
      }

      // Check if board is filling up too high (top 15% of screen)
      const topLimit = Math.max(1, Math.floor(rows * 0.15))
      let needsReset = false
      for (let r = 0; r < topLimit; r++) {
        if (grid[r].some(cell => cell === 1)) {
          needsReset = true
          break
        }
      }
      if (needsReset) {
        grid = Array.from({ length: rows }, () => Array(cols).fill(0))
        activePieces = []
      }

      // Maintain up to 2 falling pieces (1 or 2 at a time)
      while (activePieces.length < 2) activePieces.push(spawn())

      const speedMultiplier = isSpeeding ? 18 : 1

      activePieces = activePieces.filter(p => {
        // Move down
        const nextRow = p.row + (p.speed * speedMultiplier)
        
        // If it collides at next position, lock it
        if (!isValid(p.shape, nextRow, p.col)) {
          // Push back to nearest integer row that is valid
          while (!isValid(p.shape, p.row, p.col) && p.row > -5) {
             p.row -= 0.1
          }
          if (p.row > -4) lockPiece(p)
          clearLines()
          return false // Remove from active pieces
        }

        p.row = nextRow
        
        // Draw falling piece
        p.shape.forEach(([dr, dc]) => {
          drawBlock(p.row + dr, p.col + dc)
        })

        return true
      })

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchstart', handleDown)
      window.removeEventListener('touchend', handleUp)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
