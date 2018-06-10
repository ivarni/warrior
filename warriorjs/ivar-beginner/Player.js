class Player {
    act(action) {
        this.health = this.warrior.health();

        action();
    }

    captiveInFront() {
        if (this.warrior.feel().isUnit()) {
            return this.warrior.feel().getUnit().isBound();
        }
        return false;
    }

    enemyInFront() {
        if (this.warrior.feel().isUnit()) {
            return this.warrior.feel().getUnit().isEnemy();
        }
        return false;
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

        if (this.captiveInFront()) {
            return this.act(warrior.rescue);
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
