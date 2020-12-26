import { render, screen } from "@testing-library/react"
import PlayerCard, { PlayerCardProps } from "."
import { configureStore } from "../../store";

import { StatusOfAPICall } from "../../store/game/models/StatusOfApiCall";
import { GameType } from "../../store/models/GameType";

import validPeople from '../../_mocks_/validPersonOneResponse.json';
import validStarships from '../../_mocks_/validStarshipsResponse.json';

import playerLeftAvatar from '../../assets/images/playerOneAvatar.png';

describe('Player Card component', () => {
  const store = configureStore();
  
  let props: PlayerCardProps = {
    player: store.getState().game.leftPlayer,
    avatar: playerLeftAvatar,
    isWinner: false,
    status: StatusOfAPICall.SUCCESS,
    gameType: GameType.people,
  }

  it('should render player card with information base on initial state', () => {
    render(<PlayerCard {...props} />)
    const playerName = screen.getByText(store.getState().game.leftPlayer.name);
    const score = screen.getByText(/score: 0/i);
    const avatar = screen.getByRole('img');
    const noDataMessage = screen.getByText(/Cannot recieve information from space command/i);

    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(noDataMessage).toBeInTheDocument();
  })

  it('should render current card name and mass', () => {
    render(<PlayerCard {...props} people={validPeople} />)
    const cardName = screen.getByText(validPeople.name);
    const cardMass = validPeople.mass;
    const massText = screen.getByText(`Mass: ${cardMass}`)

    expect(cardName).toBeInTheDocument();
    expect(massText).toBeInTheDocument();
  })

  it('should render winner label when user has isWinner state true', () => {
    render(<PlayerCard {...props} people={validPeople} isWinner={true} />)
    const winnerText = screen.getByText(/winner/i);
  
    expect(winnerText).toBeInTheDocument();
  })

  it('should render score number base on player state', () => {
    const player = store.getState().game.leftPlayer;
    player.score = 10;
    render(<PlayerCard {...props} player={player} />)
    const playerScore = screen.getByText(`Score: ${player.score}`)

    expect(playerScore).toBeInTheDocument();
  })
})