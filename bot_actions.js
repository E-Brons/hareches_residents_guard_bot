// token for bot:     t.me/hareches_residents_guard_bot
var BOT_TOKEN = '963899224:AAHRJND16IFD0uvIrTGf7P7_GEIA6T1Z2Wg';
// chat ID for group: t.me/hareches
var CHAT_ID = '-1001352332026'

function getUserIdByPhone(phone) { 
  var options = {
    'method' : 'post',
    'payload': {
      'chat_id': CHAT_ID,
      'phone_number': phone,
    }
  };
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendContact', options);
  var result = JSON.parse(response.getContentText());
  return result.result.contact.user_id;
}

// post a message to the group
function postMessage(message){
  var options = {
    'method' : 'post',
    'payload': {
      'chat_id': CHAT_ID,
      'user_id': message,
    }
  };
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', options);
  Logger.log(response);
}

function kickUser(phone){
  // g_phone represent phone as +972...
  //  Get user id
  var userId = getUserIdByPhone(g_phone);
  if (!userId) {
    Logger.log('user id not found');
    return;
  }

  var options = {
    'method' : 'post',
    'payload': {
      'chat_id': CHAT_ID,
      'user_id': userId
    }
  };
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/kickChatMember', options);
  Logger.log(response);
}

 
function onTrigger(e){

  // 1. Scan for users whose .Group "קהילה" equals FALSE
  // 2. Extract Array of banished phones
  // 3. If (banished.size != 0)
  //   3.a.   postMessage("הבוט יסיר כעת מהקבוצה מי שלא נרשם כדייר בטופס המצויין בתיאור הקבוצה")
  //   3.b.   for phone in banished
  //           kickUser()
}
