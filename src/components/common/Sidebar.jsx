import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import { Box } from "@mui/system"
import assets from "src/assets/index"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import memoApi from "src/api/memoApi"
import { useDispatch } from "react-redux"
import { setMemo } from "src/redux/features/memoSlice"
// import { setMemo } from "src/redux/features/memoSlice"

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { memoId } = useParams()
  const user = useSelector((state) => state.user.value)
  const memos = useSelector((state) => state.memo.value)

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        dispatch(setMemo(res))
      } catch (err) {
        console.log(err)
      }
    }
    getMemos()
  }, [dispatch])

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId)
    console.log(activeIndex)
    setActiveIndex(activeIndex)
  }, [navigate])

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
        {memos.map((item, index) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            key={index}
            selected={index == activeIndex}
          >
            <Typography>{item.icon} {item.title}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer >
  )
}

export default Sidebar
