import { useCallback, useEffect } from "react";
import { Button, styled } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { useSpeechRecognition } from "@/utilities/speech";
import useCustomer from "@/state/customer";

const StyledContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    background: theme.palette.light.main,
    border: `1px solid ${theme.palette.lightGray.main}`,
    borderRadius: 12,
    paddingLeft: theme.spacing(4)
}))

const StyledInput = styled("input")`
    font-family: "Poppins";
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    margin-left: 8px;
    padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(4)}`};
`

const SpeechButton = styled(Button)`
    position: absolute;
    right: 0;
    border-radius: 12px;
    height: 100%;
`

export default function SearchInput({ value, setValue, searchvalue}) {
    const { isSupported, listening, recordedText, startRecognition, stopRecognition } = useSpeechRecognition()
    const { setSearchDish } = useCustomer(state => state)
    // const handleChange = useCallback(e => setValue(e.target.value), [setValue])
    const handleChange = (e) => {
       searchvalue(e.target.value)
    }
    //setSearchDish(value)
    useEffect(() => {
        if (!!recordedText) {
            setValue(recordedText)
        }
    }, [recordedText])

    return (
        <StyledContainer sx={{ mb: 12, mx: 10 }}>
            <SearchIcon color="mainGray" />
            <StyledInput
                // value={value}
                onChange={handleChange}
                placeholder="Search for dishes"
            />
            {isSupported && 
            <SpeechButton disabled={listening} onClick={startRecognition} variant="gradient">
                {listening? <GraphicEqIcon color="white" fontSize="medium" />: <KeyboardVoiceIcon fontSize="medium" />}
            </SpeechButton>}
        </StyledContainer>
    )
}