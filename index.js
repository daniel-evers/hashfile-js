/*
    SPDX-License-Identifier: Apache-2.0
    SPDX-FileCopyrightText: Copyright 2024 Daniel Evers

    Copyright 2024 Daniel Evers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'

export default function hashfile(path, algorithm = 'sha256', prefix = true) {
    return new Promise((resolve, reject) => {
        prefix = prefix ? algorithm + ':' : ''
        const hash = createHash(algorithm).on('error', reject).on('finish', () => resolve(prefix + hash.digest('hex')))
        createReadStream(path).on('error', reject).pipe(hash)
    })
}