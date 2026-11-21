class Version {
    /**
     * Product name.
     */
    public PRODUCT = 'Joomla!';

    /**
     * Major release version.
     */
    public MAJOR_VERSION = 6;

    /**
     * Minor release version.
     */
    public MINOR_VERSION = 0;

    /**
     * Patch release version.
     */
    public PATCH_VERSION = 3;

    /**
     * Extra release version info.
     *
     * This constant when not empty adds an additional identifier to the version string to reflect the development state.
     * For example, for 3.8.0 when this is set to 'dev' the version string will be `3.8.0-dev`.
     */
    public EXTRA_VERSION = '';

    /**
     * Gets a "standardized" version string for the current Joomla.
     */
    public getShortVersion(): string {
        let version = `${this.MAJOR_VERSION}.${this.MINOR_VERSION}.${this.PATCH_VERSION}`;

        if (!!this.EXTRA_VERSION) {
            version += '-' + this.EXTRA_VERSION;
        }

        return version;
    }
}

export default Version;
