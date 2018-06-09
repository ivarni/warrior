const RIGHT = Symbol('RIGHT');
const LEFT = Symbol('LEFT');

/* eslint-disable-next-line no-unused-vars */
class Player {
    constructor() {
        this.direction = RIGHT;
        this.reachedRightWall = false;
        this.reachedLeftWall = false;
    }

    orientate() {
        if (!this.reachedRightWall && this.act(this.warrior.feel).isWall()) {
            this.reachedRightWall = true;
            this.direction = LEFT;
            return this.warrior.pivot();
        }

        if (!this.reachedLeftWall && this.act(this.warrior.feel).isWall()) {
            this.reachedLeftWall = true;
            this.direction = RIGHT;
            return this.warrior.pivot();
        }

        return null;
    }

    act(action, direction) {
        if (action !== this.warrior.feel) {
            this.health = this.warrior.health();
        }

        return action(direction);
    }

    enemyInFront() {
        return this.act(this.warrior.feel).isEnemy();
    }

    enemyInRange() {
        const people = this.act(this.warrior.look)
            .map(space => ([space.isEnemy(), space.isCaptive(), space.isEmpty()]));

        return (people.findIndex(([enemy]) => enemy) + 1) <
            ((people.findIndex(([, captive]) => captive) + 1) || Number.MAX_VALUE) &&
            people.some(([enemy]) => enemy);
    }

    captiveInFront() {
        return this.act(this.warrior.feel).isCaptive();
    }

    lowHealth() {
        return this.health < 15;
    }

    takingDamage() {
        return this.warrior.health() < this.health;
    }

    playTurn(warrior) {
        this.warrior = warrior;

        if (!this.health) {
            this.health = warrior.health();
        }

        if (this.orientate() !== null) {
            return null;
        }

        if (this.takingDamage() && !this.enemyInFront()) {
            return this.act(warrior.walk);
        }

        if (this.enemyInFront()) {
            return this.act(warrior.attack);
        }

        if (this.enemyInRange()) {
            return this.act(warrior.shoot);
        }

        if (this.captiveInFront()) {
            return this.act(warrior.rescue);
        }

        if (this.lowHealth() && !this.takingDamage()) {
            return this.act(warrior.rest);
        }

        if (this.lowHealth()) {
            return this.act(warrior.walk, 'backward');
        }

        return this.act(warrior.walk);
    }
}
