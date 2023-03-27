
import * as React from 'react';
import { Box, Container, Button, ChakraProvider } from '@chakra-ui/react'
function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  //derived state
  let nextValue = calculateNextValue(squares);
  let winner = calculateWinner(squares);
  let status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);
  }
  function restart() {
    const emptySquares = Array(9).fill(null)
    setSquares(emptySquares)
  }

  function renderSquare(i) {
    return (

      <Button marginRight={2} marginBottom={2} colorScheme='teal' size='md' onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    );
  }

  return (
    <div>
      <div style={{marginBottom:20,textAlign:'center'}}>{status}</div>
      <div >
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div >
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div >
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <Button justifyContent={'center'} w={'93%'} marginTop={4} colorScheme='teal' size='md' onClick={restart}>
        restart
      </Button>
    </div>
  );
}

function Game() {
  return (
    <Container padding={20} marginTop={20} maxW='sm' bg='orange.500' centerContent>
      <Box  padding='4' bg='orange.500' color='black' maxW='md'>
        <Board />
      </Box>
    </Container>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <ChakraProvider>
    <Game />;
  </ChakraProvider>
}

export default App;
