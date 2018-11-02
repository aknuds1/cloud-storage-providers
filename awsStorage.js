import DataStorageProvider from './dataStorageProvider';

export default class AWSStorage extends DataStorageProvider {

  /*
    Details: Starts the oAuth process/redirect.
    By end of this process you should have token and token expiry
    stored in localStorage using inhereted functions storeToken()
    and storeTokenExpiry() from DataStorageProvider.
  */
  authorize() {
    // TODO
  }

  /*
    Details: Retrieve list off all files that can be accessed
    with token creadentials. You can check and obtain token with
    inhereted functions isTokenValid() and getToken().
    Returns: List<Objects> with paths and filenames
  */
  getAllFiles() {
    // TODO
  }

  /*
    Details: Create/obtain and return sharable link for specified file
    from getAllFiles().
    Returns: String
  */
  getSharableLinkForFile(file) {
    // TODO
  }

}
