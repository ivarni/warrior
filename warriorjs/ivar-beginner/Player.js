const RIGHT = Symbol('RIGHT');
const LEFT = Symbol('LEFT');

class Player {

    constructor() {
        this.hasReachedLeftWall = false;
        this.hasReachedRightWall = false;
        this.direction = RIGHT;
    }

    act(action, direction) {
        if (action !== this.warrior.feel) {
            this.health = this.warrior.health();
        }

        return action(direction);
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

    enemyInRange() {
        const units = this.warrior.look()
            .filter(space => space.isUnit())
            .map(space => ([space.getUnit().isBound(), space.getUnit().isEnemy()]));

        const enemyIndex = units.findIndex(([,enemy]) => enemy);
        const captiveIndex = units.findIndex(([bound]) => bound);

        return enemyIndex !== -1 && (captiveIndex === -1 || enemyIndex < captiveIndex);
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

    wallInFront() {
        return this.warrior.feel().isWall();
    }

    turnAround() {
        if (this.direction === RIGHT) {
            this.direction = LEFT;
        } else {
            this.direction = RIGHT;
        }
        return this.act(this.warrior.pivot);
    }

    playTurn(warrior) {
        this.warrior = warrior;

        if (!this.health) {
            this.health = warrior.health();
        }

        if (this.wallInFront()) {
            return this.turnAround();
        }

        if (this.captiveInFront()) {
            return this.act(warrior.rescue);
        }

        if (this.enemyInFront()) {
            return this.act(warrior.attack);
        }

        if (this.enemyInRange()) {
            return this.act(warrior.shoot);
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
