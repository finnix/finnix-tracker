#!/usr/bin/env node

// SPDX-PackageSummary: finnix-tracker
// SPDX-FileCopyrightText: Copyright (C) 2025 Ryan Finnie
// SPDX-License-Identifier: MPL-2.0

import { Server } from 'bittorrent-tracker'

const allowedHashes = {
  '67755aa32ce33650590ce7ad0d321b52ab551c75': 'finnix-0.03.iso',
  '9ef4a637001395cc4d4eabf5a1585cdd272a8db1': 'finnix-86.0.iso',
  '29b7255770001358d153f6b80ea5c735aeb8f7d0': 'finnix-86.1.iso',
  '77f451832293935b126d28fb349e13562d2909cc': 'finnix-ppc-86.1.iso',
  '14850c1a143ce2551f76e65d071040b7972900de': 'finnix-86.2.iso',
  '7dba79699e0bf0d34c19fb9099778dffd731e3c8': 'finnix-ppc-86.2.iso',
  'ed54e3ad087f8254da847b0b682d99fc8fd3ace4': 'finnix-87.0.iso',
  '27d1aae99c600b2332eb7648dd2a5f3f22ef065a': 'finnix-ppc-87.0.iso',
  '3401940c43edda113148503e2615b5ffcc48710a': 'finnix-88.0.iso',
  '430cac71b0c6033879161e64ea93a830ac8b7a23': 'finnix-ppc-88.0.iso',
  'a1847e4c22859a26c8367e9f45f4ada0df304e11': 'finnix-89.0.iso',
  'cc226c4cf88cc2aa627c1eb58e30084fd903fdb5': 'finnix-ppc-89.0.iso',
  '574f0dd83a82cfe55201b4de00c489d0d3945f00': 'finnix-89.1.iso',
  'cbfd711d32327307904a76d6a0364ff2ddf61310': 'finnix-ppc-89.1.iso',
  '98af1c0fbd049b149b92ba582083da577f9135b4': 'finnix-89.2.iso',
  '04f92cfac0f8f4c1a57c6e80ba9cc4065ac59cc2': 'finnix-ppc-89.2.iso',
  '5c62fcb29b717058260ea31416c5acd3d5a5ebb9': 'finnix-90.0.iso',
  'eb258e85c7e4fcfbe624fb58211108f8b4272ccf': 'finnix-ppc-90.0.iso',
  '34c7872e1f41a63e9e57898aad9691c1f42f0a77': 'finnix-91.0.iso',
  '02ec576c7203be4b8d502db8d6c7ac6898774c9c': 'finnix-ppc-91.0.iso',
  '278fb7800f1870cc5334a9c434716b27e114d736': 'finnix-91.1.iso',
  '6fd338cb21b98922875f778a1bb3337ef18fee56': 'finnix-ppc-91.1.iso',
  'ba51c048da9079be1825c2eff83876537d096ba7': 'finnix-92.0.iso',
  '226bd142298409b36484368a63f7c5e1bb0fbaf7': 'finnix-ppc-92.0.iso',
  'c93b21c1f250326c86f2bd110c03ee7ef977aa02': 'finnix-92.1.iso',
  '36bffc593813ae94012e86800bea04afce2fa767': 'finnix-ppc-92.1.iso',
  '10617a63ba8de98ef6cabe6f68ce8410651049d3': 'finnix-93.0.iso',
  '08cd82d0fc46b4711bb2a054b25280a19dca1ecb': 'finnix-ppc-93.0.iso',
  '62f56a5cb779bc22a0fd574c57338190acb2aac6': 'finnix-100.iso',
  'ac62c0464489a126a7ebb52de1d60d179d91bf4c': 'finnix-101.iso',
  'e86a48fc116689560eae736ab965f5c7ae6de0e0': 'finnix-ppc-101.iso',
  '5b6474d3b850150ff6e896caa097f8ff419e64c0': 'finnix-102.iso',
  'ddda5494aa4d09267c53d1b68542dc46b033cbe1': 'finnix-ppc-102.iso',
  '9cf99261281b0856bf48a12a1db84be2ac6e8199': 'finnix-103.iso',
  '1751ece5ef4753151195b93570404a48a60b3325': 'finnix-ppc-103.iso',
  'a351ae89ccd8e4a9f235acf89bf73f85db658b82': 'finnix-104.iso',
  'e3345ee21cf8869b82e4654ccd159c9359838de1': 'finnix-ppc-104.iso',
  '43b5318c2627736bd5628fbb41ecbaa33fb4bd5f': 'finnix-105.iso',
  '686f5d09504c3479e7ee66dead5109a5807457fe': 'finnix-ppc-105.iso',
  '3901a58275608de4d7bd6d5539ef527a58bad440': 'finnix-106.iso',
  '5f63fe3ae1d1318213574bd81389e91f64042f68': 'finnix-ppc-106.iso',
  'ea7c9965113d4edb9eb985f7555d0889da675df5': 'finnix-107.iso',
  '697cdfde8c3351847afb434327e35d41a09cde71': 'finnix-ppc-107.iso',
  '756212140c02f12756e718ccae06468e51593cc7': 'finnix-108.iso',
  'e9b853b7ae007e0a400587659bd3ac5ef82bdb69': 'finnix-ppc-108.iso',
  '7e1d2e6220d70bfb38f400c76e4538b3ae3bf9f7': 'finnix-109.iso',
  'cbe2d2f25897665d28a40292ec2a736a74be2aa9': 'finnix-ppc-109.iso',
  'f648abe496617c36920a0d8462dd5bfad398f93a': 'finnix-110.iso',
  '30cbe55cbb756162076f3315f01db777ca4644a0': 'finnix-ppc-110.iso',
  'fb106c83860cc4690fcb7f942c2d54c4ad3b1bc1': 'finnix-111.iso',
  '0296e3154cd9eccd1d710cc79d5b115dd72720c7': 'finnix-ppc-111.iso',
  'f3f26deb82ad572012125f346032a0f183a0b143': 'finnix-armhf-111.iso',
  '4b860f9b39abeed6a4c8c6a4363fef16eaae1064': 'finnix-120.iso',
  '42e985574d55efa0374c32e11838a6f13b257ef2': 'finnix-121.iso',
  'ed96f7eb623063ebd916ac133fe2d7b97ef13934': 'finnix-122.iso',
  '59b0e770f7823b9c8e81322cab4049fb10182775': 'finnix-123.iso',
  'd461e00dc3ca2bedb0b91abfc0d42700706fbec8': 'finnix-124.iso',
  '396cd1dcfccd459a7c23373816d115366ff5cb6e': 'finnix-125.iso',
  'f77bf5c34fa630dc4408a6169c96d54211bad04a': 'finnix-126.iso',
  '8004e785720788b614de8de65b6b42b85e9b2d50': 'finnix-250.iso',
}

const server = new Server({
  http: true,
  stats: true,
  udp: false,
  ws: false,
  trustProxy: true, // WARNING: completely trusts; strip X-Forwarded-For on FE required
  filter: function (infoHash, params, cb) {
    if (infoHash in allowedHashes) {
      cb(null)
    } else {
      cb(new Error('Disallowed info_hash from ' + params.addr + ': ' + infoHash))
    }
  }
})

server.on('listening', function () {
  console.error('finnix-tracker listening on ' + server.http.address().address + ' ' + server.http.address().port)
})
server.on('error', function (err) {
  console.error('finnix-tracker ERROR: ' + err.message)
})
server.on('warning', function (err) {
  console.log('finnix-tracker WARNING: ' + err.message)
})
server.on('update', function (addr, params) {
  console.log('finnix-tracker ' + params.info_hash + ' (' + allowedHashes[params.info_hash] + ') update: ' + addr)
})
server.on('complete', function (addr, params) {
  console.log('finnix-tracker ' + params.info_hash + ' (' + allowedHashes[params.info_hash] + ') complete: ' + addr)
})
server.on('start', function (addr, params) {
  console.log('finnix-tracker ' + params.info_hash + ' (' + allowedHashes[params.info_hash] + ') start: ' + addr)
})
server.on('stop', function (addr, params) {
  console.log('finnix-tracker ' + params.info_hash + ' (' + allowedHashes[params.info_hash] + ') stop: ' + addr)
})

server.listen(8000)
