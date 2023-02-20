import { IconButton, TextField } from "@mui/material"
import { Box } from "@mui/system"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const memo = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlinedIcon variant="outlined" color="error" />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 40px" }} >
        <TextField placeholder="無題" variant="outlined" fullWidth />
        <TextField placeholder="追加" variant="outlined" fullWidth />
      </Box>
    </>
  )
}

export default memo
