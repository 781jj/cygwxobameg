var AI = function() {
	var a, b, c = function(a, b, c, d, f, g) {
			return e(a, b, c, d, f, g)
		},
		d = 0,
		e = function(c, d, e, g, h, i) {
			a = d, b = i;
			var j = f(-999999, 999999, a, c, e, g, h);
			return {
				x: j.x,
				y: j.y
			}
		},
		f = function(b, c, e, i, j, k, l) {
			if (0 == e) return d++, {
				value: h(i, j, k, l)
			};
			for (var m = g(i, k, l), n = 0; n < m.length; n++) {
				var o = m[n],
					l = o.y,
					k = o.x;
				i[l][k] = j;
				var p = -f(-c, -b, e - 1, i, -j, k, l).value;
				if (i[l][k] = 0, p >= c) return {
					x: k,
					y: l,
					value: c
				};
				if (p > b && (b = p, a == e)) var q = {
					x: k,
					y: l,
					value: b
				}
			}
			return a == e ? q ? q : !1 : {
				x: k,
				y: l,
				value: p
			}
		},
		g = function(a, c, d) {
			var e = b.pur,
				f = [],
				g = c - e;
			0 > g && (g = 0);
			var h = c + e;
			h > 14 && (h = 14);
			var i = d - e;
			0 > i && (i = 0);
			var j = d + e;
			j > 14 && (j = 14);
			for (var c, d, k = i; j >= k; k++)
				for (var l = g; h >= l; l++) {
					var m = a[k][l];
					0 === m && f.push({
						x: l,
						y: k
					})
				}
			return f
		},
		h = function(a, b, c, d) {
			var e = i(a, b, c, d);
			return e += i(a, -b, c, d), e * -b
		},
		i = function(a, c, d, e) {
			function f(b, c, d) {
				return 0 > b || b > 14 || 0 > c || c > 14 ? !1 : (m = a[c][b], m == d ? (j.n++, !0) : (0 === m && j.v++, !1))
			}
			var g = Math.floor(Math.random() * b.random),
				h = (b.pur, 15),
				i = {
					11: 1,
					12: 2,
					21: 10,
					22: 20,
					31: 30,
					32: 50,
					41: 60,
					42: 8e3,
					50: 88888 - 100 * c,
					51: 88888 - 100 * c,
					52: 88888 - 100 * c
				},
				j = {};
			j.n = 1, j.v = 0;
			for (var k = 1; h >= k; k++) {
				var l = d - k;
				if (!f(l, e, c)) break
			}
			for (var k = 1; h > k; k++) {
				var l = d + k;
				if (!f(l, e, c)) break
			}
			j.n > 5 && (j.n = 5), g += i[10 * j.n + j.v] || 0, j.n = 1, j.v = 0;
			for (var k = 1; h > k; k++) {
				var n = e - k;
				if (!f(d, n, c)) break
			}
			for (var k = 1; h > k; k++) {
				var n = e + k;
				if (!f(d, n, c)) break
			}
			j.n > 5 && (j.n = 5), g += i[10 * j.n + j.v] || 0, j.n = 1, j.v = 0;
			for (var k = 1; h > k; k++) {
				var l = d - k,
					n = e - k;
				if (!f(l, n, c)) break
			}
			for (var k = 1; h > k; k++) {
				var l = d + k,
					n = e + k;
				if (!f(l, n, c)) break
			}
			j.n > 5 && (j.n = 5), g += i[10 * j.n + j.v] || 0, j.n = 1, j.v = 0;
			for (var k = 1; h > k; k++) {
				var l = d + k,
					n = e - k;
				if (!f(l, n, c)) break
			}
			for (var k = 1; h > k; k++) {
				var l = d - k,
					n = e + k;
				if (!f(l, n, c)) break
			}
			return j.n > 5 && (j.n = 5), g += i[10 * j.n + j.v] || 0
		};
	return c
}();