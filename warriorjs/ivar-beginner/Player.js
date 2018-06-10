class Player {
    act(action) {
        action();
    }

    enemyInFront() {
        return !this.warrior.feel().isEmpty();
    }

    playTurn(warrior) {
        this.warrior = warrior;

        if (this.enemyInFront()) {
            return this.act(warrior.attack);
        }

        return this.act(warrior.walk);
    }
}
