import { render, screen } from "@testing-library/react"
import Header from './'
;
import { GameType } from "../../store/models/GameType"

describe('Header component', () => {
  const gameType = GameType.people;
  const userSelectedGameType = false;
  const handleOnClick = jest.fn();

  it('should render header element', () => {
    render(<Header gameType={gameType} userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
    const title = screen.getByText('gwizdek');
    const selectGameType = screen.getByText('Choose cards type');

    expect(title).toBeInTheDocument();
    expect(selectGameType).toBeInTheDocument();
  })

  it('should render switch to starships button when people cards are selected', () => {
    const userSelectedGameType = true;
    render(<Header gameType={gameType} userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
    const button = screen.getByText(/change cards to starships/i);

    expect(button).toBeInTheDocument();
  })

  it('should render switch to people button when starships cards are selected', () => {
    const gameType = GameType.starships;
    const userSelectedGameType = true;
    render(<Header gameType={gameType} userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
    const button = screen.getByText(/change cards to people/i);

    expect(button).toBeInTheDocument();
  })
})