import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Picker from "@emoji-mart/react"

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoij] = useState()
  const [isShowPicker, setIsShowPicker] = useState(false)

  useEffect(() => {
    setSelectedEmoij(props.icon)
  }, [props.icon])
  const showPicker = () => setIsShowPicker(!isShowPicker)

  return (
    <Box>
      <Typography variant="h3" fontWeight="700" sx={{ cursor: "pointer" }} onClick={showPicker}>
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100"
        }}
      >
        <Picker />
      </Box>
    </Box>
  )
}

export default EmojiPicker