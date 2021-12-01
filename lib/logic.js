/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.patient.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    

    tx.patient.document = tx.newDocument;
    let participantRegistry = await getParticipantRegistry('org.patient.Patient');
    await participantRegistry.update(tx.patient);

    // Emit an event for the modified asset.
   // let event = getFactory().newEvent('org.patient', 'SampleEvent');
    //event.asset = tx.asset;
    //event.oldValue = "oldValue";
    //event.newValue = "newValue";
    //emit(event);
}

/**
 * add report
 * @param {org.patient.addReport} addReport
 * @transaction
 */
async function addReport(tx){
	tx.patient.document.reports.push(tx.report);
  const assetRegistry = await getAssetRegistry('org.patient.Document');
   await assetRegistry.update(tx.patient.document);
	let participantRegistry = await getParticipantRegistry('org.patient.Patient');
    await participantRegistry.update(tx.patient);
}
