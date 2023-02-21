import { IconButton, TextField } from "@mui/material"
import { Box } from "@mui/system"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import memoApi from "src/api/memoApi"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setMemo } from "src/redux/features/memoSlice"

const memo = () => {
  const { memoId } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const memos = useSelector((state) => state.memo.value)

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId)
        setTitle(res.title)
        setDescription(res.description)
      } catch (err) {
        console.log(err)
      }
    }
    getMemo()
  }, [memoId])

  let timer
  const timeout = 500

  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle })
      } catch (err) {
        console.log(err)
      }
    }, timeout)
  }

  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription })
      } catch (err) {
        console.log(err)
      }
    }, timeout)
  }

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId)
      console.log(deletedMemo)
      const newMemos = memos.filter((e) => e._id !== memoId)
      dispatch(setMemo(newMemos))
      if (newMemos.length === 0) {
        navigate("/memo")
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo} >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 40px" }} >
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            fontWeight: "700"
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
            fontWeight: "1rem"
          }}
        />
      </Box>
    </>
  )
}

export default memo
