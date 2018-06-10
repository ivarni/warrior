class Player {

    constructor() {
        this.hasReachedBackWall = false;
    }

    act(action, direction) {
        if (action !== this.warrior.feel) {
            this.health = this.warrior.health();
        }

        if (this.warrior.feel('backward').isWall()) {
            this.hasReachedBackWall = true;
        }

        if (direction) {
            return action(direction);
        }

        return action(!this.hasReachedBackWall ? 'backward' : 'forward');
    }

    captiveInFront() {
        if (this.act(this.warrior.feel).isUnit()) {
            return this.act(this.warrior.feel).getUnit().isBound();
        }
        return false;
    }

    enemyInFront() {
        if (this.act(this.warrior.feel).isUnit()) {
            return this.act(this.warrior.feel).getUnit().isEnemy();
        }
        return false;
    }

    healthIsLow() {
        return this.warrior.health() < 20;
    }

    healthIsVeryLow() {
        return this.warrior.health() < 10;
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

        if (this.healthIsVeryLow() && this.takingDamage()) {
            return this.act(warrior.walk, 'backward');
        }

        return this.act(warrior.walk);
    }
}
