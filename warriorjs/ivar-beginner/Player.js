class Player {
    act(action) {
        action();
    }

    enemyInFront() {
        return !this.warrior.feel().isEmpty();
    }

    healthIsLow() {
        return this.warrior.health() < 15;
    }

    playTurn(warrior) {
        this.warrior = warrior;

        if (!this.health) {
            this.health = warrior.health();
        }

        if (this.enemyInFront()) {
            return this.act(warrior.attack);
        }

        if (this.healthIsLow()) {
            return this.act(warrior.rest);
        }

        return this.act(warrior.walk);
    }
}
