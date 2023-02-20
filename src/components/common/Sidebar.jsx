import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  Typography,
} from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import { Box } from "@mui/system"
import assets from "src/assets/index"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect } from "react"
import memoApi from "src/api/memoApi"

const Sidebar = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value)

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    getMemos()
  }, [])

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ padddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
            <IconButton>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ padddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }} component={Link} to="/memo/asdfasdfa">
          <Typography>📝仮置きメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default Sidebar
