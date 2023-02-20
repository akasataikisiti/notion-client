import { Box } from "@mui/material"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import authUtils from "src/utils/authUtils"
import Sidebar from "../common/Sidebar"
import { useDispatch } from "react-redux"
import { setUser } from "src/redux/features/userSlice"

const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // JWTTを持っているのか確認
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate("/login")
      } else {
        // ユーザを保存する
        dispatch(setUser(user))
      }
    }
    checkAuth()
  }, [navigate])
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout
