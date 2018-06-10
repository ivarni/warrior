class Player {
    act(action) {
        this.health = this.warrior.health();

        action();
    }

    enemyInFront() {
        return !this.warrior.feel().isEmpty();
    }

    healthIsLow() {
        return this.warrior.health() < 15;
    }

    takingDamage() {
        return this.warrior.health() < this.health;
    }

    playTurn(warrior) {
        this.warrior = warrior;

        if (!this.health) {
            this.health = warrior.health();
        }

        if (this.enemyInFront()) {
            return this.act(warrior.attack);
        }

        if (this.healthIsLow() && !this.takingDamage()) {
            return this.act(warrior.rest);
        }

        return this.act(warrior.walk);
    }
}
