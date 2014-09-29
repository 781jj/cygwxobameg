function Ninja() {
    this.load(img_ninja, 36, 42, 0, 0, 36, 42);
    this.addAnim("run", 8, !0, [0, 1]);
    this.play("run", !0);
    this.hurtTimer = this.level = this.deadTimer = 0;
    this.reset = function(e, t, n) {
        this.visible = this.active = !0;
        this.speedy = 1 + .005 * m_killCount;
        this.x = Math.floor(e);
        this.y = Math.floor(t);
        this.deadTimer = 0;
        this.level = n
    };
    var e = 0;
    this.update = function(t) {
        0 >= this.deadTimer ? (this.preUpdate(t), 0 < this.hurtTimer && (this.hurtTimer -= .2), this.y += this.speedy, 0 == this.currentAnim.currentFrameIndex && (this.y += this.speedy), this.y > SCREEN_HEIGHT && (this.visible = this.active = !1, m_shuriken.combo = 0, m_shakingTimer = .2, 20 <= m_hpDisplay.health && (m_hpDisplay.health -= 20, 0 >= m_hpDisplay.health && (m_shuriken.active = !1, m_shuriken.visible = !1, m_notification.reset(NOTIFY_GAME_OVER)))), m_shuriken.active && !m_shuriken.isAtHost() && 0 >= this.hurtTimer && !(this.x + this.w < m_shuriken.x || this.x > m_shuriken.x + m_shuriken.w || this.y + this.h < m_shuriken.y || this.y > m_shuriken.y + m_shuriken.h) && (e = m_shuriken.level > this.level + 1 ? this.level + 1 : m_shuriken.level, this.level -= e, m_shuriken.level -= e, 0 > this.level ? this.deadTimer = 1 : this.hurtTimer = 1, m_scoreContextPool.next().reset(this.x + .5 * this.w, this.y + .5 * this.h, 10 + 5 * m_shuriken.combo, !0), m_scoreDisplay.score += 10 + 5 * m_shuriken.combo, m_shuriken.onTarget()), this.postUpdate(t)) : (this.deadTimer -= .2, 0 >= this.deadTimer && (this.visible = this.active = !1, m_killCount++))
    };
    this.render = function(e, t, n) {
        var r = this.currentAnim.currentFrame + 2 * this.level;
        if (0 < this.deadTimer || 0 < this.hurtTimer) r = this.currentAnim.currentFrame + 6;
        t = Math.round(this.x - this.offsetX + t);
        n = Math.round(this.y - this.offsetY + n);
        0 >= this.deadTimer ? e.drawImage(this.image, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, t, n, this.frameWidth, this.frameHeight) : (e.globalAlpha = this.deadTimer, e.drawImage(this.image, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, t, n, this.frameWidth, this.frameHeight), e.globalAlpha = 1)
    }
}
function Samurai() {
    this.load(img_samurai, 42, 48, 0, 0, 42, 48);
    this.addAnim("run", 10, !0, [0, 1]);
    this.play("run", !0);
    this.deadTimer = 0;
    this.reset = function(e, t) {
        this.visible = this.active = !0;
        this.speedy = 2;
        this.x = Math.floor(e);
        this.y = Math.floor(t);
        this.deadTimer = 0
    };
    this.update = function(e) {
        0 >= this.deadTimer ? (this.preUpdate(e), this.y += this.speedy, 0 == this.currentAnim.currentFrameIndex && (this.y += this.speedy), this.y > SCREEN_HEIGHT - this.h && (this.visible = this.active = !1, m_sumonTimer = .01, m_scoreContextPool.next().reset(this.x + .5 * this.w, this.y + .5 * this.h, 100, !0), m_scoreDisplay.score += 100), m_shuriken.isAtHost() || this.x + this.w < m_shuriken.x || this.x > m_shuriken.x + m_shuriken.w || this.y + this.h < m_shuriken.y || this.y > m_shuriken.y + m_shuriken.h || (this.deadTimer = 1, m_shuriken.combo = 0, m_shuriken.deactive(), m_sumonTimer = .01), this.postUpdate(e)) : (this.deadTimer -= .2, 0 >= this.deadTimer && (this.visible = this.active = !1))
    };
    this.render = function(e, t, n) {
        var r = this.currentAnim.currentFrame;
        0 < this.deadTimer && (r = this.currentAnim.currentFrame + 2);
        t = Math.round(this.x - this.offsetX + t);
        n = Math.round(this.y - this.offsetY + n);
        0 >= this.deadTimer ? e.drawImage(this.image, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, t, n, this.frameWidth, this.frameHeight) : (e.globalAlpha = this.deadTimer, e.drawImage(this.image, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, t, n, this.frameWidth, this.frameHeight), e.globalAlpha = 1)
    }
}
function Shuriken() {
    this.load(img_shuriken, 27, 27, 0, 0, 27, 27);
    this.addAnim("spin", 240, !0, [0, 1, 2, 3]);
    this.play("spin", !0);
    this.needShadow = !0;
    this.host_x = .5 * SCREEN_WIDTH;
    this.host_y = SCREEN_HEIGHT - 2 * img_top.height;
    this.onHand = !1;
    this.combo = this.cosa = this.sina = 0;
    this.targeted = !1;
    this.level = 0;
    this.reset = function(e, t, n) {
        this.x = Math.floor(e);
        this.y = Math.floor(t);
        this.visible = this.active = !0;
        this.speedy = this.speedx = 0;
        this.targeted = this.onHand = !1;
        this.level = 0;
        n && (this.combo = this.cosa = this.sina = 0)
    };
    this.isAtHost = function() {
        return 0 == this.speedx && 0 == this.speedy
    };
    this.fireFrom = function() {
        this.isAtHost() && (this.onHand ? (10 < m_shuriken.combo ? (this.speedx = 18 * -this.cosa, this.speedy = 18 * -this.sina) : (this.speedx = 12 * -this.cosa, this.speedy = 12 * -this.sina), this.level = 40 < this.combo ? 3 : 20 < this.combo ? 2 : 1) : this.speedy = this.speedx = 0)
    };
    this.moveTo = function(e, t) {
        if (this.isAtHost()) {
            var n = m_math.sqrt((e - this.host_x) * (e - this.host_x) + (t - this.host_y) * (t - this.host_y));
            3 < n ? (this.cosa = (e - this.host_x) / n, this.sina = (t - this.host_y) / n, this.x = Math.floor(this.host_x + 60 * this.cosa - .5 * this.h), this.y = Math.floor(this.host_y + 60 * this.sina - .5 * this.w), this.onHand = !0) : (this.sina = this.cosa = 0, this.x = this.host_x - .5 * this.w, this.y = this.host_y - .5 * this.h, this.onHand = !1)
        }
    };
    this.onTarget = function() {
        this.combo++;
        this.targeted = !0;
        0 >= this.level && this.deactive()
    };
    this.deactive = function() {
        this.visible = this.active = !1;
        this.reset(this.host_x - .5 * this.w, this.host_y - .5 * this.h, !1)
    };
    this.update = function(e) {
        this.preUpdate(e); ! this.isAtHost() && (this.x += this.speedx, this.y += this.speedy, 1 < this.level && (0 > this.x || this.x > SCREEN_WIDTH - this.w) && (this.speedx = -this.speedx, this.level--), this.y < -this.h || this.x < -this.w || this.y > SCREEN_HEIGHT || this.x > SCREEN_WIDTH) && (this.targeted || (this.combo = 0), this.deactive());
        this.postUpdate(e)
    };
    this.render = function(e, t, n) {
        var r = this.currentAnim.currentFrame + this.flip * this.numberOfFrames,
        i = Math.round(this.x - this.offsetX + t),
        s = Math.round(this.y - this.offsetY + n);
        if (this.isAtHost()) {
            var o = Math.floor(3 * m_heartBeat.delta);
            e.drawImage(img_indicator, 0, 0, 21, 21, i + 3, s + 27 + o, 21, 21);
            e.drawImage(img_indicator, 21, 0, 21, 21, i + 3, s - 21 - o, 21, 21);
            e.drawImage(img_indicator, 42, 0, 21, 21, i - 21 - o, s + 3, 21, 21);
            e.drawImage(img_indicator, 63, 0, 21, 21, i + 27 + o, s + 3, 21, 21);
            if (this.onHand) for (var o = (this.x + .5 * this.w - this.host_x) / 4, u = (this.y + .5 * this.h - this.host_y) / 4, a = 0; 4 > a; a++) i = Math.floor(this.host_x + o * a - this.offsetX + t - 4),
            s = Math.floor(this.host_y + u * a - this.offsetY + n - 4),
            e.drawImage(img_gib, 0, 0, 9, 9, i, s, 9, 9)
        }
        i = Math.round(this.x - this.offsetX + t);
        s = Math.round(this.y - this.offsetY + n);
        this.needShadow && e.drawImage(img_shuriken_shadow, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, i, s + 9, this.frameWidth, this.frameHeight);
        e.drawImage(this.image, this.frames[r].x, this.frames[r].y, this.frameWidth, this.frameHeight, i, s, this.frameWidth, this.frameHeight)
    }
}
function HitDisplay() {
    this.update = function() {};
    this.render = function(e, t, n) {
        e.drawImage(img_text_hit, t - img_text_hit.width, n + 6);
        m_scoreFont.write(e, m_shuriken.combo, t - img_text_hit.width - 3, n, !1, 4)
    }
}
function ScoreDisplay() {
    this.visible = !1;
    this.score = 0;
    this.render = function(e, t, n) {
        m_scoreFont.write(e, this.score, t, n, !1, 8)
    }
}
function HPDisplay() {
    this.health = 100;
    this.render = function(e, t, n) {
        e.drawImage(img_hp_bar, t, n);
        n = 3 * Math.floor(40 - .4 * this.health);
        e.fillRect(t + img_hp_bar.width - 6 - n, 12, n, 9)
    }
}
function ScorePanel() {
    this.tween = new dot_VarTween;
    this.visible = this.active = !1;
    this.score = this.state = 0;
    try {
        this.best = localStorage && localStorage.getItem("assaultBest") ? localStorage.assaultBest: 0
    } catch(e) {
        this.best = 0
    }
    this.needNew = !1;
    this.medal = new dot_Medal;
    this.reset = function() {
        play68_submitScore(m_scoreDisplay.score);
        this.x = SCREEN_WIDTH - img_score_panel.width >> 1;
        this.y = SCREEN_HEIGHT;
        this.tween.reset(this.y, SCREEN_HEIGHT - img_score_panel.height >> 1, EASE_CUBE_INOUT, .5);
        this.visible = this.active = !0;
        this.state = 0;
        this.needNew = !1
    };
    this.update = function(e) {
        if (!this.tween.finished && (this.tween.update(e), 0 == this.state ? this.y = Math.floor(this.tween.delta) : this.score = Math.floor(this.tween.delta), this.tween.finished)) if (0 == this.state) this.tween.reset(0, m_scoreDisplay.score, EASE_CUBE_INOUT, 2),
        this.state = 1;
        else if (1 == this.state) {
            if (this.score > this.best) {
                this.best = this.score;
                this.needNew = !0;
                try {
                    localStorage && localStorage.setItem("assaultBest", this.best)
                } catch(t) {}
            }
            m_button_ok.reset(SCREEN_WIDTH - m_button_ok.w >> 1, SCREEN_HEIGHT - img_top.height - 60);
            m_button_ok.visible = !0;
            2e5 <= this.score ? this.medal.reset(this.x + 48, this.y + 45, 0) : 1e5 <= this.score ? this.medal.reset(this.x + 48, this.y + 45, 1) : 5e4 <= this.score ? this.medal.reset(this.x + 48, this.y + 45, 2) : 25e3 <= this.score && this.medal.reset(this.x + 48, this.y + 45, 3)
        }
        this.medal.active && this.medal.update(e);
        m_button_ok.active && (m_button_ok.update(e), m_button_ok.justReleased && 1 == this.state && (m_effect.reset(EFFECT_FADE_IN, .25, 1), this.state = 2))
    };
    this.render = function(e, t, n) {
        e.drawImage(img_score_panel, this.x, this.y);
        m_scoreFont.write(e, this.score, this.x + 309, this.y + 33, !1, 8);
        m_scoreFont.write(e, this.best, this.x + 309, this.y + 96, !1, 8);
        this.needNew && e.drawImage(img_new, this.x + 204, this.y + 72);
        this.medal.visible && this.medal.render(e, t, n);
        m_button_ok.visible && (m_button_ok.render(e, t, n), m_shurikenIcon.preUpdate(.03), m_shurikenIcon.x = m_button_ok.x - 9 - m_shurikenIcon.w, m_shurikenIcon.y = m_button_ok.y + 6, m_shurikenIcon.render(e, t, n), m_shurikenIcon.x = m_button_ok.x + m_button_ok.w + 9, m_shurikenIcon.y = m_button_ok.y + 6, m_shurikenIcon.render(e, t, n))
    }
}
function Notification() {
    this.textImage = null;
    this.tween = new dot_VarTween;
    this.state = 0;
    this.visible = this.active = !1;
    this.scorePanel = new ScorePanel;
    this.reset = function(e) {
        e == NOTIFY_READY ? (this.textImage = img_text_ready, this.stay = !1) : (this.textImage = img_text_gameover, this.stay = !0);
        this.tween.reset(0, 1, EASE_CUBE_INOUT, 1);
        this.state = 0;
        this.visible = this.active = !0;
        this.scorePanel.active = !1;
        this.scorePanel.visible = !1
    };
    this.update = function(e) {
        this.active && (this.tween.finished || (this.tween.update(e), this.tween.finished && (0 == this.state ? (this.tween.reset(0, 1, EASE_CUBE_INOUT, 1), this.state = 1) : 1 == this.state ? this.stay ? (this.tween.reset(SCREEN_HEIGHT - img_scroll.height >> 1, (SCREEN_HEIGHT - 144 >> 1) - img_scroll.height - 18, EASE_CUBE_INOUT, .25), this.state = 3, this.scorePanel.reset()) : (this.tween.reset(1, 0, EASE_CUBE_INOUT, .5), this.state = 2) : 2 == this.state ? (this.active = this.visible = !1, m_playing = !0) : 3 == this.state && (this.state = 4))), this.scorePanel.active && this.scorePanel.update(e))
    };
    this.render = function(e, t, n) {
        this.visible && (0 == this.state || 2 == this.state ? (e.globalAlpha = this.tween.delta, e.drawImage(img_scroll, SCREEN_WIDTH - img_scroll.width >> 1, SCREEN_HEIGHT - img_scroll.height >> 1), e.drawImage(this.textImage, SCREEN_WIDTH - this.textImage.width >> 1, SCREEN_HEIGHT - this.textImage.height >> 1), e.globalAlpha = 1) : 1 == this.state ? (e.drawImage(img_scroll, SCREEN_WIDTH - img_scroll.width >> 1, SCREEN_HEIGHT - img_scroll.height >> 1), e.drawImage(this.textImage, SCREEN_WIDTH - this.textImage.width >> 1, SCREEN_HEIGHT - this.textImage.height >> 1)) : 3 == this.state ? (e.drawImage(img_scroll, SCREEN_WIDTH - img_scroll.width >> 1, Math.floor(this.tween.delta)), e.drawImage(this.textImage, SCREEN_WIDTH - this.textImage.width >> 1, Math.floor(this.tween.delta) + (img_scroll.height - this.textImage.height >> 1)), this.scorePanel.render(e, t, n)) : 4 == this.state && (e.drawImage(img_scroll, SCREEN_WIDTH - img_scroll.width >> 1, (SCREEN_HEIGHT - 144 >> 1) - img_scroll.height - 18), e.drawImage(this.textImage, SCREEN_WIDTH - this.textImage.width >> 1, (SCREEN_HEIGHT - 144 >> 1) - img_scroll.height - 18 + (img_scroll.height - this.textImage.height >> 1)), this.scorePanel.render(e, t, n)))
    }
}
function Title() {
    this.tween = new dot_VarTween;
    this.visible = this.active = !1;
    this.w = img_title.width;
    this.h = img_title.height;
    this.x = SCREEN_WIDTH - this.w >> 1;
    this.y = -this.h;
    this.reset = function() {
        this.y = -this.h;
        this.tween.reset( - this.h, (SCREEN_HEIGHT >> 1) - this.h, EASE_CUBE_INOUT, .25);
        this.visible = this.active = !0
    };
    this.update = function(e) {
        this.tween.finished || (this.tween.update(e), this.y = Math.floor(this.tween.delta))
    };
    this.render = function(e) {
        e.drawImage(img_title, this.x, this.y);
        e.drawImage(img_brand_copyright, SCREEN_WIDTH - img_brand_copyright.width >> 1, SCREEN_HEIGHT - (img_top.height - img_brand_copyright.height >> 1) - img_brand_copyright.height)
    }
}
var m_imageList = "brand_logo load_bar load_element number_context number_score medals blink button_ok button_start title brand_copyright ninja bg top scroll shuriken text_ready text_gameover samurai shuriken_shadow indicator gib hp_bar text_hit score_panel new".split(" "),
m_ninjaPool,
m_sumonTimer = 0,
m_samurai,
m_shuriken,
m_shakingTimer = 0,
m_shaking_y = 0,
m_hitDisplay,
m_scoreDisplay,
m_scoreFont,
m_hpDisplay,
m_killCount = 0,
m_notification,
m_playing = !1,
m_button_ok,
m_button_start,
m_shurikenIcon,
m_title;
var NOTIFY_READY = 0,
NOTIFY_GAME_OVER = 1;
this.gameUpdate = function(e) {
    if (m_playing) {
        if (0 < m_sumonTimer && (m_sumonTimer -= e, 0 >= m_sumonTimer)) {
            m_sumonTimer = .5 + 1 * Math.random();
            var t = m_ninjaPool.next(),
            n = Math.random();
            n < .001 * m_killCount ? t.reset(Math.random() * (SCREEN_WIDTH - t.w), -t.h, 2) : n < .005 * m_killCount ? t.reset(Math.random() * (SCREEN_WIDTH - t.w), -t.h, 1) : t.reset(Math.random() * (SCREEN_WIDTH - t.w), -t.h, 0)
        }
        m_samurai.active && (m_samurai.update(e), m_samurai.visible && m_samurai.render(m_fgObjectContext, 0, 0))
    }
    m_ninjaPool.update(e);
    m_ninjaPool.render(m_fgObjectContext, 0, 0);
    m_fgObjectContext.drawImage(img_top, Math.floor(.5 * (SCREEN_WIDTH - img_top.width)), SCREEN_HEIGHT - img_top.height + m_shaking_y);
    m_playing && (m_scoreDisplay.visible && (m_scoreDisplay.render(m_fgObjectContext, SCREEN_WIDTH - 6, 6), 1 < m_shuriken.combo && (m_hitDisplay.update(e), m_hitDisplay.render(m_fgObjectContext, SCREEN_WIDTH - 6, SCREEN_HEIGHT - img_text_hit.height - 12)), m_hpDisplay.render(m_fgObjectContext, 6, 6)), 0 < m_shakingTimer && (m_shakingTimer -= e, m_shaking_y = 0 >= m_shakingTimer ? 0 : Math.floor(6 * Math.random())));
    m_playing && m_shuriken.active && 0 < m_hpDisplay.health && (m_shuriken.update(e), m_shuriken.render(m_fgObjectContext, 0, 0));
    m_notification.active && (m_notification.update(e), m_notification.render(m_fgObjectContext, 0, 0));
    m_button_start.active && (m_title.update(e), m_title.render(m_fgObjectContext, 0, 0), m_button_start.update(e), m_button_start.render(m_fgObjectContext, 0, 0), m_shurikenIcon.preUpdate(.03), m_shurikenIcon.x = m_button_start.x - 9 - m_shurikenIcon.w, m_shurikenIcon.y = m_button_start.y + 6, m_shurikenIcon.render(m_fgObjectContext, 0, 0), m_shurikenIcon.x = m_button_start.x + m_button_start.w + 9, m_shurikenIcon.y = m_button_start.y + 6, m_shurikenIcon.render(m_fgObjectContext, 0, 0), m_button_start.justReleased && m_effect.finished && m_effect.reset(EFFECT_FADE_IN, .25, 3));
    m_effect.finished && (1 == m_effect.info ? (gameInit(), m_effect.reset(EFFECT_FADE_OUT, .25, 2)) : 3 == m_effect.info && (m_notification.reset(NOTIFY_READY), adRemove(), m_title.active = !1, m_title.visible = !1, m_button_start.active = !1, m_button_start.visible = !1, m_shuriken.reset(.5 * (SCREEN_WIDTH - m_shuriken.w), SCREEN_HEIGHT - 2 * img_top.height), m_effect.reset(EFFECT_FADE_OUT, .25, 4)))
};
this.gameInit = function() {
    Ninja.prototype = new dot_Sprite;
    Ninja.prototype.constructor = Ninja;
    Samurai.prototype = new dot_Sprite;
    Samurai.prototype.constructor = Samurai;
    Shuriken.prototype = new dot_Sprite;
    Shuriken.prototype.constructor = Shuriken;
    m_scoreFont = new dot_NumberFont;
    m_scoreFont.load(img_number_score, 24, 30);
    m_scoreDisplay = new ScoreDisplay;
    m_scoreDisplay.visible = !0;
    m_scoreDisplay.score = 0;
    m_hitDisplay = new HitDisplay;
    m_hpDisplay = new HPDisplay;
    m_ninjaPool = new dot_ObjectPool;
    m_ninjaPool.create(Ninja, 30);
    m_ninjaPool.needUpdateReverse = !0;
    m_samurai = new Samurai;
    m_samurai.reset(.5 * (SCREEN_WIDTH - m_samurai.w), -m_samurai.h);
    m_shuriken = new Shuriken;
    m_shuriken.reset(.5 * (SCREEN_WIDTH - m_shuriken.w), SCREEN_HEIGHT - 2 * img_top.height);
    m_backgroundContext.drawImage(img_bg, 0, Math.floor(.5 * (SCREEN_HEIGHT - img_bg.height)));
    m_notification = new Notification;
    m_button_ok = new dot_Button;
    m_button_ok.create(img_button_ok, img_button_ok.width, img_button_ok.height);
    m_button_start = new dot_Button;
    m_button_start.create(img_button_start, img_button_start.width, img_button_start.height);
    m_button_start.reset(SCREEN_WIDTH - m_button_start.w >> 1, SCREEN_HEIGHT - img_top.height - 60);
    m_button_start.visible = !0;
    m_title = new Title;
    m_title.reset();
    m_playing = !1;
    m_killCount = m_sumonTimer = 0;
    m_shurikenIcon = new dot_Sprite;
    m_shurikenIcon.load(img_shuriken, 27, 27, 0, 0, 27, 27);
    m_shurikenIcon.addAnim("spin", 240, !0, [0, 1, 2, 3]);
    m_shurikenIcon.play("spin", !0);
    m_shurikenIcon.reset(10, 10);
    m_fgObjectContext.fillStyle = "#000000"
};
this.touchPressed = function(e) {
    var t;
    0 < e.targetTouches.length && (t = e.targetTouches[0].pageX - m_backgroundCanvas.offsetLeft, e = e.targetTouches[0].pageY - m_backgroundCanvas.offsetTop, m_shuriken.active && m_shuriken.moveTo(t, e), m_button_ok.active && t > m_button_ok.x && t < m_button_ok.x + m_button_ok.w && e > m_button_ok.y && e < m_button_ok.y + m_button_ok.h && (m_button_ok.pressing = !0), m_button_start.active && t > m_button_start.x && t < m_button_start.x + m_button_start.w && e > m_button_start.y && e < m_button_start.y + m_button_start.h && (m_button_start.pressing = !0))
};
this.touchReleased = function(e) {
    var t;
    0 < e.changedTouches.length && (t = e.changedTouches[0].pageX - m_backgroundCanvas.offsetLeft, e = e.changedTouches[0].pageY - m_backgroundCanvas.offsetTop, m_shuriken && m_shuriken.active && m_shuriken.fireFrom(t, e), m_button_ok && m_button_ok.active && t > m_button_ok.x && t < m_button_ok.x + m_button_ok.w && e > m_button_ok.y && e < m_button_ok.y + m_button_ok.h && (m_button_ok.pressing = !1), m_button_start && m_button_start.active && t > m_button_start.x && t < m_button_start.x + m_button_start.w && e > m_button_start.y && e < m_button_start.y + m_button_start.h && (m_button_start.pressing = !1))
};
this.mousePressed = function(e) {
    var t;
    t = e.pageX - m_backgroundCanvas.offsetLeft;
    e = e.pageY - m_backgroundCanvas.offsetTop;
    m_shuriken && m_shuriken.active && m_shuriken.moveTo(t, e);
    m_button_ok && m_button_ok.active && t > m_button_ok.x && t < m_button_ok.x + m_button_ok.w && e > m_button_ok.y && e < m_button_ok.y + m_button_ok.h && (m_button_ok.pressing = !0);
    m_button_start && m_button_start.active && t > m_button_start.x && t < m_button_start.x + m_button_start.w && e > m_button_start.y && e < m_button_start.y + m_button_start.h && (m_button_start.pressing = !0)
};
this.mouseReleased = function(e) {
    var t;
    t = e.pageX - m_backgroundCanvas.offsetLeft;
    e = e.pageY - m_backgroundCanvas.offsetTop;
    m_shuriken && m_shuriken.active && m_shuriken.fireFrom(t, e);
    m_button_ok && m_button_ok.active && t > m_button_ok.x && t < m_button_ok.x + m_button_ok.w && e > m_button_ok.y && e < m_button_ok.y + m_button_ok.h && (m_button_ok.pressing = !1);
    m_button_start && m_button_start.active && t > m_button_start.x && t < m_button_start.x + m_button_start.w && e > m_button_start.y && e < m_button_start.y + m_button_start.h && (m_button_start.pressing = !1)
}