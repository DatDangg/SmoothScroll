import React, { useState } from 'react';
import Latex from './Latex';

function App() {
  const [title, setTitle] = useState('');
  const [questions, setQuestion] = useState([{ text: '' }]);

  const handleTitle = (e) => {
    setTitle(e)
  }

  const handleChange = (index, value) => {
    const current = [...questions]
    current[index].text = value
    setQuestion(current)
  };
  
  const handleAddQuestion = () => {
    setQuestion([...questions, { text:'' }])
  };

  const handleSaveQuestion = () => {
    console.log({title, questions})
  }

  const handleDelete = (index) => {
    const newC = questions.filter((question, idx)=> {
      return idx !== index
    })
    setQuestion(newC)
  }

  const renderMixedText = (input) => {
    const parts = input.split(/(\$\$.*?\$\$)/g);
    return parts.map((part, index) => {
      const match = part.match(/\$\$(.*?)\$\$/);
      if (match) {
        return <Latex key={index} tex={match[1]} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Tạo đề toán</h3>
      Tên đề: <input value={title} onChange={(e)=>handleTitle(e.target.value)}></input>
      {questions.map((question, index) => (
        <div key={index} style={{border: '1px solid red', padding: '20px', margin: '20px'}}>
          <p>Câu {index+1}:</p>
          <button onClick={()=>handleDelete(index)}>Xoá</button>
          <p>Nhập câu hỏi</p>
          <input
            onChange={(e) => handleChange(index, e.target.value)}
            value={question.text}
            style={{ width: '97%', padding: '10px' }}
            placeholder='Ví dụ: Giải phương trình $$x^2 + 2x + 1 = 0$$'
          />
          <p>Preview</p>
          <p
            style={{
              marginTop: '1rem',
              border: '1px solid black',
              height: '40px',
              padding: '10px',
              fontSize: '20px',
            }}
          >
            {renderMixedText(question.text)}
          </p>
        </div>
      ))}
      <button onClick={() => handleAddQuestion()} style={{marginRight: '50px'}}>Add</button>
      <button onClick={() => handleSaveQuestion()}>Save</button>
    </div>
  );
}

export default App;
