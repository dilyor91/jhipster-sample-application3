package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.MaterialTopicRepository;
import uz.tashkec.service.MaterialTopicService;
import uz.tashkec.service.dto.MaterialTopicDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.MaterialTopic}.
 */
@RestController
@RequestMapping("/api")
public class MaterialTopicResource {

    private final Logger log = LoggerFactory.getLogger(MaterialTopicResource.class);

    private static final String ENTITY_NAME = "materialTopic";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialTopicService materialTopicService;

    private final MaterialTopicRepository materialTopicRepository;

    public MaterialTopicResource(MaterialTopicService materialTopicService, MaterialTopicRepository materialTopicRepository) {
        this.materialTopicService = materialTopicService;
        this.materialTopicRepository = materialTopicRepository;
    }

    /**
     * {@code POST  /material-topics} : Create a new materialTopic.
     *
     * @param materialTopicDTO the materialTopicDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materialTopicDTO, or with status {@code 400 (Bad Request)} if the materialTopic has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/material-topics")
    public ResponseEntity<MaterialTopicDTO> createMaterialTopic(@RequestBody MaterialTopicDTO materialTopicDTO) throws URISyntaxException {
        log.debug("REST request to save MaterialTopic : {}", materialTopicDTO);
        if (materialTopicDTO.getId() != null) {
            throw new BadRequestAlertException("A new materialTopic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialTopicDTO result = materialTopicService.save(materialTopicDTO);
        return ResponseEntity
            .created(new URI("/api/material-topics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /material-topics/:id} : Updates an existing materialTopic.
     *
     * @param id the id of the materialTopicDTO to save.
     * @param materialTopicDTO the materialTopicDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialTopicDTO,
     * or with status {@code 400 (Bad Request)} if the materialTopicDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materialTopicDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/material-topics/{id}")
    public ResponseEntity<MaterialTopicDTO> updateMaterialTopic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialTopicDTO materialTopicDTO
    ) throws URISyntaxException {
        log.debug("REST request to update MaterialTopic : {}, {}", id, materialTopicDTO);
        if (materialTopicDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialTopicDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialTopicRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MaterialTopicDTO result = materialTopicService.update(materialTopicDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialTopicDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /material-topics/:id} : Partial updates given fields of an existing materialTopic, field will ignore if it is null
     *
     * @param id the id of the materialTopicDTO to save.
     * @param materialTopicDTO the materialTopicDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialTopicDTO,
     * or with status {@code 400 (Bad Request)} if the materialTopicDTO is not valid,
     * or with status {@code 404 (Not Found)} if the materialTopicDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the materialTopicDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/material-topics/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MaterialTopicDTO> partialUpdateMaterialTopic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialTopicDTO materialTopicDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update MaterialTopic partially : {}, {}", id, materialTopicDTO);
        if (materialTopicDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialTopicDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialTopicRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MaterialTopicDTO> result = materialTopicService.partialUpdate(materialTopicDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialTopicDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /material-topics} : get all the materialTopics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materialTopics in body.
     */
    @GetMapping("/material-topics")
    public List<MaterialTopicDTO> getAllMaterialTopics() {
        log.debug("REST request to get all MaterialTopics");
        return materialTopicService.findAll();
    }

    /**
     * {@code GET  /material-topics/:id} : get the "id" materialTopic.
     *
     * @param id the id of the materialTopicDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materialTopicDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/material-topics/{id}")
    public ResponseEntity<MaterialTopicDTO> getMaterialTopic(@PathVariable Long id) {
        log.debug("REST request to get MaterialTopic : {}", id);
        Optional<MaterialTopicDTO> materialTopicDTO = materialTopicService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materialTopicDTO);
    }

    /**
     * {@code DELETE  /material-topics/:id} : delete the "id" materialTopic.
     *
     * @param id the id of the materialTopicDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/material-topics/{id}")
    public ResponseEntity<Void> deleteMaterialTopic(@PathVariable Long id) {
        log.debug("REST request to delete MaterialTopic : {}", id);
        materialTopicService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
