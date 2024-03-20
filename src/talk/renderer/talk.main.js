/*
 * @copyright Copyright (c) 2022 Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
 *
 * @author Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import '@talk/css/icons.css'
import './assets/styles.css'

import 'regenerator-runtime' // TODO: Why isn't it added on bundling
import { init, initTalkHashIntegration } from './init.js'
import { setupWebPage } from '../../shared/setupWebPage.js'

// Initially open the welcome page, if not specified
if (!window.location.hash) {
	window.location.hash = '#/apps/spreed'
}

await setupWebPage()

const { router } = await init()

const { createDesktopApp } = await import('./desktop.app.js')
createDesktopApp(router)

await import('@talk/src/main.js')

initTalkHashIntegration(OCA.Talk.instance.$pinia)

await import('./notifications/notifications.store.js')
