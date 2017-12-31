import QtQuick 2.0
import Sailfish.Silica 1.0

Label {
    property string word
    property double velocity
    property int typed_letters: 0

    text: word
    font.pixelSize: Theme.fontSizeLarge

    function handle_keypress(key) {
        if (word.substring(typed_letters, typed_letters + 1) === key) {
            typed_letters++
        } else {
            return "wrong"
        }

        text = "<b>" + word.substring(0, typed_letters) + "</b>" + word.substring(typed_letters)
        if (word.length == typed_letters) {
            return "completed"
        }
    }
}
