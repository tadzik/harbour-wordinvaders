# NOTICE:
#
# Application name defined in TARGET has a corresponding QML filename.
# If name defined in TARGET is changed, the following needs to be done
# to match new name:
#   - corresponding QML filename must be changed
#   - desktop icon filename must be changed
#   - desktop filename must be changed
#   - icon definition filename in desktop file must be changed
#   - translation filenames have to be changed

# The name of your application
TARGET = harbour-wordinvaders

CONFIG += sailfishapp

SOURCES += src/harbour-wordinvaders.cpp

DISTFILES += qml/harbour-wordinvaders.qml \
    qml/cover/CoverPage.qml \
    rpm/harbour-wordinvaders.changes.in \
    rpm/harbour-wordinvaders.changes.run.in \
    rpm/harbour-wordinvaders.spec \
    rpm/harbour-wordinvaders.yaml \
    harbour-wordinvaders.desktop \
    qml/pages/GamePage.qml

SAILFISHAPP_ICONS = 86x86 108x108 128x128
