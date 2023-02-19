import { Box, Button, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "src/api/authApi";
import { useState } from "react";

const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("")
  const [passwordErrText, setPasswordErrText] = useState("")
  const [confirmErrText, setConfirmErrText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText("")
    setPasswordErrText("")
    setConfirmErrText("")

    //入力欄の文字列を取得
    const data = new FormData(e.target)
    const username = data.get("username").trim()
    const password = data.get("password").trim()
    const confirmPassword = data.get("confirmPassword").trim()
    console.log(username)
    console.log(password)
    console.log(confirmPassword)

    let error = false

    if (username === "") {
      setUsernameErrText("名前を入力してください")
      error = true
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください")
      error = true
    }
    if (confirmPassword === "") {
      setConfirmErrText("確認用パスワードを入力してください。")
      error = true
    }
    if (password !== confirmPassword) {
      setConfirmErrText("パスワードと確認用パスワードが異なります。")
      error = true
    }

    if (error) return

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
      })
      localStorage.setItem("token", res.token)
      console.log("新規登録に成功しました")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  )
}

export default Register
