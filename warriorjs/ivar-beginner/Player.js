class Player {
    act(action) {
        action();
    }

    playTurn(warrior) {
        this.warrior = warrior;

        this.act(warrior.walk);
    }
}

