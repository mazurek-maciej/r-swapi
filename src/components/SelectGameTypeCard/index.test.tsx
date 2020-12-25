import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectGameTypeCard from '.';
import { GameType } from "../../store/models/GameType";

describe('SelectGameTypeCard component', () => {
  const handleChooseGame = jest.fn();

  it('should render people card when game type is set to people', () => {
    render(<SelectGameTypeCard handleChooseGame={handleChooseGame} gameType={GameType.people} />)
    const peopleCardTitle = screen.queryByText(/people/i);
    const starshipsCardTitle = screen.queryByText(/starships/i);

    expect(peopleCardTitle).toBeInTheDocument();
    expect(starshipsCardTitle).toBeNull();
  });


  it('should render starships card when game type is set to starships', () => {
    render(<SelectGameTypeCard handleChooseGame={handleChooseGame} gameType={GameType.starships} />)
    const peopleCardTitle = screen.queryByText(/people/i);
    const starshipsCardTitle = screen.queryByText(/starships/i);

    expect(starshipsCardTitle).toBeInTheDocument();
    expect(peopleCardTitle).toBeNull();
  });

  it('should be able to call handleChooseGame after click on card', () => {
    render(<SelectGameTypeCard handleChooseGame={handleChooseGame} gameType={GameType.starships} />)
    const cardContainer = screen.getByTestId('game-type-card');

    userEvent.click(cardContainer);

    expect(handleChooseGame).toBeCalledTimes(1);
  })
})