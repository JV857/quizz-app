import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../service/useAxios";
import { handleScoreChange } from "../redux/actions";
import Timer from "./Timer";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const navigate = useNavigate();
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  return (
    <Box mt={5} className="questions_wrapper">
      <Typography variant="h4" className="question_title">
        Question {questionIndex + 1}{" "}
        <h4 className="timer_container">
          {/* Time Left :{" "} */}
          <Timer
            minutes={15}
            // seconds={5}
          />
        </h4>
      </Typography>
      <Typography mt={5}>
        {decode(response.results[questionIndex].question)}
      </Typography>
      <div style={{ display: "grid" }}>
        {options.map((data, id) => (
          <Box mt={2} key={id}>
            <Button onClick={handleClickAnswer} variant="outlined">
              {decode(data)}
            </Button>
          </Box>
        ))}
      </div>

      <Box mt={5}>
        <b>Score</b>: {score} Correct answers out of / {response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;
