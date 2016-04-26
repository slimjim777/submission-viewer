/*
 * Copyright (C) 2016-2017 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
'use strict'
var React = require('react');


var KeyValues = React.createClass({
	getInitialState: function() {
		return {showLogIndex: 0};
	},

	handleClickViewLog: function(e) {
		var index = parseInt(e.target.getAttribute('data-index'));
		if (this.state.showLogIndex === index) {
			// Hide the log
			this.setState({showLogIndex: 0});
		} else {
			this.setState({showLogIndex: index});
		}
	},

	renderIOLog: function(key, i) {
		if (this.state.showLogIndex === i) {
			var log = atob(this.props.section[key]);
			return (
				<pre>{log}</pre>
			);
		}
	},

	render: function() {
		var self = this;
		var i = this.props.index;

		return (
			<div className="twelve-col">
				<h2>{this.props.title}</h2>
				<table>
					<tbody>
						{Object.keys(this.props.section).map(function(key) {
							i += 1;
							if (key === 'io_log') {
								return (
									<tr key={i}>
										<td>{key}</td>
										<td>
											<button data-index={i} onClick={self.handleClickViewLog}>View</button>
											{self.renderIOLog(key, i)}
										</td>
									</tr>
								)
							} else {
								return (
									<tr key={i}>
										<td>{key}</td><td>{self.props.section[key]}</td>
									</tr>
								)
							}
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = KeyValues;
