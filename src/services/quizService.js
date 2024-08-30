import axios from 'axios';

// const baseUrl = 'http://localhost:3000/api/v1/quiz';
const baseUrl = 'https://quiz-app-backend-y40k.onrender.com/api/v1/quiz';
const QUIZ_PREFIX = 'livequiz/';

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${baseUrl}/createQuiz`, quizData, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error creating quiz';
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/myQuiz/question`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const fetchQuizData = async (quizId) => {
  try {
    const response = await axios.get(`${baseUrl}/${quizId}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const deleteQuizData = async (quizId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${quizId}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz data:", error);
    throw error;
  }
};

export const updateQuizData = async (quizId, quizData) => {
  try {
    const response = await axios.put(`${baseUrl}/update/${quizId}`,
      quizData, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz data:", error);
    throw error;
  }
};

export const publishQuiz = async (quizId) => {
  try {
    const response = await axios.put(`${baseUrl}/${quizId}/publish`, null, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }
    );
    if (response.data.success) {
      return `${QUIZ_PREFIX}${response.data.quizLink}`;
    } else {
      throw new Error(response.data.message || 'Error publishing quiz');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to publish quiz');
  }
};

export const getPublishedQuiz = async (slugID) => {
  try {
    const response = await axios.get(`${baseUrl}/livequiz/${slugID}`);
    if (response.data.success) {
      return response.data.quiz;
    } else {
      throw new Error(response.data.message || 'Error fetching quiz');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch quiz');
  }
};



export const updateQuizImpressions = async (id) => {
  try {
    const response = await axios.put(`${baseUrl}/impression/${id}`);
    if (response.data.success) {
      return response.data.quiz;
    } else {
      throw new Error(response.data.message || 'Error publishing quiz');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to publish quiz');
  }
};


export const updateQuestionImpression = async (questionId) => {
  try {
    const response = await axios.put(`${baseUrl}/questionimpression/${questionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCorrectAnswerCount = async (questionId, optionId) => {
  try {
    const response = await axios.put(`${baseUrl}/updateCorrect/${questionId}/${optionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


