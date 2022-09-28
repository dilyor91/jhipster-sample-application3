package uz.tashkec.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.IntegrationTest;
import uz.tashkec.domain.Popup;
import uz.tashkec.repository.PopupRepository;
import uz.tashkec.service.dto.PopupDTO;
import uz.tashkec.service.mapper.PopupMapper;

/**
 * Integration tests for the {@link PopupResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PopupResourceIT {

    private static final Boolean DEFAULT_IS_IMAGE = false;
    private static final Boolean UPDATED_IS_IMAGE = true;

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_REDIRECT_URL = "AAAAAAAAAA";
    private static final String UPDATED_REDIRECT_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/popups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PopupRepository popupRepository;

    @Autowired
    private PopupMapper popupMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPopupMockMvc;

    private Popup popup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Popup createEntity(EntityManager em) {
        Popup popup = new Popup().isImage(DEFAULT_IS_IMAGE).videoUrl(DEFAULT_VIDEO_URL).redirectUrl(DEFAULT_REDIRECT_URL);
        return popup;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Popup createUpdatedEntity(EntityManager em) {
        Popup popup = new Popup().isImage(UPDATED_IS_IMAGE).videoUrl(UPDATED_VIDEO_URL).redirectUrl(UPDATED_REDIRECT_URL);
        return popup;
    }

    @BeforeEach
    public void initTest() {
        popup = createEntity(em);
    }

    @Test
    @Transactional
    void createPopup() throws Exception {
        int databaseSizeBeforeCreate = popupRepository.findAll().size();
        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);
        restPopupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(popupDTO)))
            .andExpect(status().isCreated());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeCreate + 1);
        Popup testPopup = popupList.get(popupList.size() - 1);
        assertThat(testPopup.getIsImage()).isEqualTo(DEFAULT_IS_IMAGE);
        assertThat(testPopup.getVideoUrl()).isEqualTo(DEFAULT_VIDEO_URL);
        assertThat(testPopup.getRedirectUrl()).isEqualTo(DEFAULT_REDIRECT_URL);
    }

    @Test
    @Transactional
    void createPopupWithExistingId() throws Exception {
        // Create the Popup with an existing ID
        popup.setId(1L);
        PopupDTO popupDTO = popupMapper.toDto(popup);

        int databaseSizeBeforeCreate = popupRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPopupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(popupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPopups() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        // Get all the popupList
        restPopupMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(popup.getId().intValue())))
            .andExpect(jsonPath("$.[*].isImage").value(hasItem(DEFAULT_IS_IMAGE.booleanValue())))
            .andExpect(jsonPath("$.[*].videoUrl").value(hasItem(DEFAULT_VIDEO_URL)))
            .andExpect(jsonPath("$.[*].redirectUrl").value(hasItem(DEFAULT_REDIRECT_URL)));
    }

    @Test
    @Transactional
    void getPopup() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        // Get the popup
        restPopupMockMvc
            .perform(get(ENTITY_API_URL_ID, popup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(popup.getId().intValue()))
            .andExpect(jsonPath("$.isImage").value(DEFAULT_IS_IMAGE.booleanValue()))
            .andExpect(jsonPath("$.videoUrl").value(DEFAULT_VIDEO_URL))
            .andExpect(jsonPath("$.redirectUrl").value(DEFAULT_REDIRECT_URL));
    }

    @Test
    @Transactional
    void getNonExistingPopup() throws Exception {
        // Get the popup
        restPopupMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPopup() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        int databaseSizeBeforeUpdate = popupRepository.findAll().size();

        // Update the popup
        Popup updatedPopup = popupRepository.findById(popup.getId()).get();
        // Disconnect from session so that the updates on updatedPopup are not directly saved in db
        em.detach(updatedPopup);
        updatedPopup.isImage(UPDATED_IS_IMAGE).videoUrl(UPDATED_VIDEO_URL).redirectUrl(UPDATED_REDIRECT_URL);
        PopupDTO popupDTO = popupMapper.toDto(updatedPopup);

        restPopupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, popupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(popupDTO))
            )
            .andExpect(status().isOk());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
        Popup testPopup = popupList.get(popupList.size() - 1);
        assertThat(testPopup.getIsImage()).isEqualTo(UPDATED_IS_IMAGE);
        assertThat(testPopup.getVideoUrl()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testPopup.getRedirectUrl()).isEqualTo(UPDATED_REDIRECT_URL);
    }

    @Test
    @Transactional
    void putNonExistingPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, popupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(popupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(popupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(popupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePopupWithPatch() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        int databaseSizeBeforeUpdate = popupRepository.findAll().size();

        // Update the popup using partial update
        Popup partialUpdatedPopup = new Popup();
        partialUpdatedPopup.setId(popup.getId());

        partialUpdatedPopup.isImage(UPDATED_IS_IMAGE).videoUrl(UPDATED_VIDEO_URL);

        restPopupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPopup.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPopup))
            )
            .andExpect(status().isOk());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
        Popup testPopup = popupList.get(popupList.size() - 1);
        assertThat(testPopup.getIsImage()).isEqualTo(UPDATED_IS_IMAGE);
        assertThat(testPopup.getVideoUrl()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testPopup.getRedirectUrl()).isEqualTo(DEFAULT_REDIRECT_URL);
    }

    @Test
    @Transactional
    void fullUpdatePopupWithPatch() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        int databaseSizeBeforeUpdate = popupRepository.findAll().size();

        // Update the popup using partial update
        Popup partialUpdatedPopup = new Popup();
        partialUpdatedPopup.setId(popup.getId());

        partialUpdatedPopup.isImage(UPDATED_IS_IMAGE).videoUrl(UPDATED_VIDEO_URL).redirectUrl(UPDATED_REDIRECT_URL);

        restPopupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPopup.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPopup))
            )
            .andExpect(status().isOk());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
        Popup testPopup = popupList.get(popupList.size() - 1);
        assertThat(testPopup.getIsImage()).isEqualTo(UPDATED_IS_IMAGE);
        assertThat(testPopup.getVideoUrl()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testPopup.getRedirectUrl()).isEqualTo(UPDATED_REDIRECT_URL);
    }

    @Test
    @Transactional
    void patchNonExistingPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, popupDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(popupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(popupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPopup() throws Exception {
        int databaseSizeBeforeUpdate = popupRepository.findAll().size();
        popup.setId(count.incrementAndGet());

        // Create the Popup
        PopupDTO popupDTO = popupMapper.toDto(popup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPopupMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(popupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Popup in the database
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePopup() throws Exception {
        // Initialize the database
        popupRepository.saveAndFlush(popup);

        int databaseSizeBeforeDelete = popupRepository.findAll().size();

        // Delete the popup
        restPopupMockMvc
            .perform(delete(ENTITY_API_URL_ID, popup.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Popup> popupList = popupRepository.findAll();
        assertThat(popupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
