import React, { Component } from "react";
import { connect } from "react-redux";

import Square from "./Square";
import PieceContainer from "./PieceContainer";
import { calculMoves } from "../redux/actions/pieceActions";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { board, pieces } = props;

    this.state = {
      x: 0,
      y: 0,
      chessIsMount: false
    };

    this.boardRef = React.createRef();
  }

  onMouseMove = e => {
    e.stopPropagation();
    const mouseXPosition = e.clientX - this.boardRef.current.offsetLeft;
    const mouseYPosition = e.clientY - this.boardRef.current.offsetTop;
    this.setState({ x: mouseXPosition, y: mouseYPosition });
  };

  componentDidMount() {
    const { calculMoves, board } = this.props;
    calculMoves();
    this.setState({
      chessIsMount: true
    });
  }
  componentDidUpdate() {}

  render() {
    const { board, pieces, game } = this.props;
    const { chessIsMount, playerTurn } = this.state;
    const sizeBoard = 600;

    const styles = {
      width: sizeBoard + "px",
      height: sizeBoard + "px"
    };

    return (
      <div
        style={styles}
        onMouseMove={this.onMouseMove}
        className="chessBoard"
        ref={this.boardRef}
      >
        {game.isCheckMate && <div className="checkmate-box">Checkmate! </div>}

        {board.map(el => (
          <Square key={el.squareName} data={el}></Square>
        ))}

        {chessIsMount &&
          pieces.map(el => (
            <PieceContainer
              refParent={this.boardRef}
              key={el.index}
              data={el}
            ></PieceContainer>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    pieces: state.pieces,
    game: state.game
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculMoves: () => dispatch(calculMoves())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
